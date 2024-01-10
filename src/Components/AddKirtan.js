import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IndexedDBService from "../Utils/DBConfig";
import CkEditorTextArea from "./CkEditorTextArea";
import { setKirtanIndex } from "../Slice/KirtanIndexSlice";
import ConfirmBox from "./ConfirmBox";

const AddKirtanStepper = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isEdit = window.location.pathname.split("/")[1] === "edit";

  const kirtanId = window.location.pathname.split("/")[2];

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [isValid, setIsValid] = useState(false);

  const [kirtanData, setKirtanData] = useState([]);

  const [kirtanTitle, setKirtanTitle] = useState("");

  const [kirtanLines, setKirtanLines] = useState("");

  const [fontFamily, setFontFamily] = useState("Guj_Simple_Normal");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getEditorFont = (font) => setFontFamily(font);

  const getEditorContent = (kirtan) => setKirtanLines(kirtan);

  const handleShowDeleteConfirm = (x) => setShowDeleteConfirm(x);

  const getKirtanById = () =>
    kirtanData.find((kirtan) => kirtan.id == kirtanId);

  const handleSubmit = async () => {
    const DbData = {
      id: isEdit
        ? Number(kirtanId)
        : kirtanData.length > 0
        ? kirtanData[kirtanData.length - 1]?.id + 1
        : 0,
      title: kirtanTitle,
      content: kirtanLines.split("\n").filter((line) => line !== ""),
      shortcuts: getKirtanById()?.shortcuts || {
        0: "1",
        1: "2",
        2: "3",
        3: "4",
        4: "5",
        5: "6",
        6: "7",
        7: "8",
        8: "9",
      },
      originalContent: kirtanLines,
      settings: {
        fontFamily: getKirtanById()?.settings?.fontFamily || fontFamily,
        fontSize: getKirtanById()?.settings?.fontSize || "50px",
        fontWeight: getKirtanById()?.settings?.fontWeight || "500",
        color: getKirtanById()?.settings?.color || "#ffffff",
        backgroundColor:
          getKirtanById()?.settings?.backgroundColor || "#000000",
        height: getKirtanById()?.settings?.height || "100px",
        textShadowColor:
          getKirtanById()?.settings?.textShadowColor || "#ffffff",
        textShadowWidth: getKirtanById()?.settings?.textShadowWidth || "0px",
      },
      favLines: getKirtanById()?.favLines || [],
    };

    if (isDbInitialized)
      if (!isEdit) {
        IndexedDBService.addItem(DbData)
          .then(() => {
            dispatch(setKirtanIndex(DbData.id));
            navigate("/");
          })
          .catch((error) => console.error(error));
      } else {
        IndexedDBService.updateItem(DbData)
          .then(() => {
            dispatch(setKirtanIndex(kirtanId));
            navigate("/");
          })
          .catch((error) => console.error(error));
      }
  };

  const handleDelete = () => {
    isDbInitialized &&
      IndexedDBService.deleteItem(Number(kirtanId))
        .then(() => {
          IndexedDBService.getAllData().then((data) => {
            dispatch(setKirtanIndex(data[0]?.id || 0));
            navigate("/");
          });
        })
        .catch((error) => console.error(error));
  };

  const handleKeyPress = (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      if (event.key === "Delete") handleShowDeleteConfirm(true);
    }
    // else if (event.key === "Enter")
    //   if (showDeleteConfirm) {
    //     handleShowDeleteConfirm(false);
    //     handleDelete();
    //   }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    setIsValid(
      kirtanLines.trim() !== "" && kirtanLines !== "fgg" && kirtanTitle !== ""
    );
  }, [kirtanLines, kirtanTitle]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) => setKirtanData(data));
  }, [isDbInitialized]);

  useEffect(() => {
    if (Object.keys(kirtanData).length > 0) {
      const currKirtanData = Object.values(kirtanData).find(
        (kirtan) => kirtan.id === Number(kirtanId)
      );
      currKirtanData && setKirtanTitle(currKirtanData.title);
    }
  }, [kirtanData]);

  useEffect(() => {
    if (isEdit)
      if (kirtanData[kirtanId]?.originalContent === kirtanLines)
        setIsValid(false);
      else setIsValid(true);
  }, [isEdit, kirtanLines, kirtanData]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="container pt-3">
        <Box sx={{ width: "100%" }}>
          <Box className="flex justify-between item-center w-full gap-3 pb-2">
            <TextField
              id="outlined-basic"
              variant="filled"
              size="small"
              label={kirtanTitle ? "" : "Title"}
              width="50%"
              autoComplete="off"
              value={kirtanTitle}
              onChange={(e) => setKirtanTitle(e.target.value)}
            />
            <Box className="flex justify-end item-end gap-3 pb-2">
              {isEdit && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleShowDeleteConfirm(true)}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  dispatch(setKirtanIndex(isEdit ? kirtanId : 0));
                  navigate("/");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
                disabled={!isValid}
              >
                {isEdit ? "Update" : "Save"}
              </Button>
            </Box>
          </Box>
          <div className="mt-2 mb-1">
            <CkEditorTextArea
              getEditorContent={getEditorContent}
              getEditorFont={getEditorFont}
              isEdit={isEdit}
              kirtanId={kirtanId}
            />
          </div>
        </Box>
        <ConfirmBox
          open={showDeleteConfirm}
          handleClose={handleShowDeleteConfirm}
          handleConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddKirtanStepper;
