import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../CSS/Stepper.css";
import IndexedDBService from "../Utils/DBConfig";
import CkEditorTextArea from "./CkEditorTextArea";

const AddKirtanStepper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = window.location.pathname.split("/")[1] === "edit";

  const [kirtanId, setKirtanId] = useState(
    window.location.pathname.split("/")[2]
  );

  const [kirtanTitle, setKirtanTitle] = useState("");

  const [isValid, setIsValid] = useState(false);

  const [kirtanLines, setKirtanLines] = useState("");

  const [fontFamily, setFontFamily] = useState("Guj_Simple_Normal");

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const getEditorContent = (kirtan) => setKirtanLines(kirtan);

  const getEditorFont = (font) => setFontFamily(font);

  const [kirtanData, setKirtanData] = useState({});

  const handleSubmit = async () => {
    const DbData = {
      id: isEdit ? kirtanId : Object.keys(kirtanData).length + 1,
      title: kirtanTitle,
      content: kirtanLines.split("\n").filter((line) => line !== ""),
      shortcuts: {},
      settings: {
        fontFamily: fontFamily,
      },
    };

    if (!isEdit) {
      IndexedDBService.addItem(DbData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error(error));
    } else {
      IndexedDBService.updateItem(DbData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    setIsValid(
      kirtanLines.trim() !== "" && kirtanLines !== "fgg" && kirtanTitle !== ""
    );
  }, [kirtanLines, kirtanTitle]);

  useEffect(() => {
    IndexedDBService.getAllData().then((data) => {
      setKirtanData(data);
    });
  }, [isDbInitialized]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="container pt-3">
        <Box sx={{ width: "100%" }}>
          <Box className="flex justify-between item-center w-full gap-3 pb-2">
            <TextField
              id="outlined-basic"
              variant="filled"
              size="small"
              label="Title"
              width="50%"
              autoComplete="off"
              onChange={(e) => setKirtanTitle(e.target.value)}
            />
            <Box className="flex justify-end item-end gap-3 pb-2">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
                disabled={!isValid}
              >
                Submit
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
