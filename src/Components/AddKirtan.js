import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IndexedDBService from "../Utils/DBConfig";
import CkEditorTextArea from "./CkEditorTextArea";
import { setKirtanIndex } from "../Slice/KirtanIndexSlice";

const AddKirtanStepper = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isEdit = window.location.pathname.split("/")[1] === "edit";

  const kirtanId = window.location.pathname.split("/")[2];

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [isValid, setIsValid] = useState(false);

  const [kirtanData, setKirtanData] = useState({});

  const [kirtanTitle, setKirtanTitle] = useState("");

  const [kirtanLines, setKirtanLines] = useState("");

  const [fontFamily, setFontFamily] = useState("Guj_Simple_Normal");

  const getEditorContent = (kirtan) => setKirtanLines(kirtan);

  const getEditorFont = (font) => setFontFamily(font);

  const handleSubmit = async () => {
    const DbData = {
      id: isEdit ? Number(kirtanId) : Object.keys(kirtanData).length,
      title: kirtanTitle,
      content: kirtanLines.split("\n").filter((line) => line !== ""),
      shortcuts: kirtanData[kirtanId]?.shortcuts || {
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
        fontFamily: kirtanData[kirtanId]?.settings?.fontFamily || fontFamily,
        fontSize: kirtanData[kirtanId]?.settings?.fontSize || "50px",
        fontWeight: kirtanData[kirtanId]?.settings?.fontWeight || "500",
        color: kirtanData[kirtanId]?.settings?.color || "#ffffff",
        backgroundColor:
          kirtanData[kirtanId]?.settings?.backgroundColor || "#000000",
        height: kirtanData[kirtanId]?.settings?.height || "100px",
        textShadowColor:
          kirtanData[kirtanId]?.settings?.textShadowColor || "#000000",
        textShadowWidth:
          kirtanData[kirtanId]?.settings?.textShadowWidth || "0px",
      },
    };

    if (!isEdit) {
      IndexedDBService.addItem(DbData)
        .then(() => navigate("/"))
        .catch((error) => console.error(error));
    } else {
      IndexedDBService.updateItem(DbData)
        .then(() => navigate("/"))
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = () => {
    IndexedDBService.deleteItem(kirtanId)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setIsValid(
      kirtanLines.trim() !== "" && kirtanLines !== "fgg" && kirtanTitle !== ""
    );
  }, [kirtanLines, kirtanTitle]);

  useEffect(() => {
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
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  dispatch(setKirtanIndex(0));
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
      </div>
    </div>
  );
};

export default AddKirtanStepper;
