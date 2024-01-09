/* eslint-disable */
import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddStepperKirtan,
  setAddStepperKirtanSlice,
} from "../Slice/addStepperSlice";
import { setKirtanFontFamily } from "../Slice/kirtanSlice";
import TurndownService from "turndown";
import Showdown from "showdown";
import CKEditorCss from "./../ckeditor.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IndexedDBService from "../Utils/DBConfig";

const CkEditorTextArea = ({ getEditorContent, getEditorFont, kirtanId }) => {
  const turndownService = new TurndownService();

  const converter = new Showdown.Converter();

  const dispatch = useDispatch();

  const [kirtanData, setKirtanData] = useState({});

  const addStepperKirtan = useSelector(
    (state) => state.addStepperSlice.addStepperKirtan
  );

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const [editorData, setEditorData] = useState("");

  const [selectFontFamily, setSelectFontFamily] = useState(
    useSelector((state) => state.settings.fontFamily)
  );

  const handleSelectFontFamilyChange = (event) => {
    setSelectFontFamily(event.target.value);
    dispatch(setKirtanFontFamily(event.target.value));
    localStorage.setItem("fontFamily", event.target.value);
    getEditorFont(event.target.value);
  };

  const handleEditorChange = async (event, editor) => {
    const data = editor.getData();
    const markdown = turndownService.turndown(data);
    const latestData = markdown === "" ? "fgg" : markdown;
    dispatch(setAddStepperKirtan(latestData));
    getEditorContent(latestData);
  };

  useEffect(() => {
    dispatch(
      setAddStepperKirtanSlice(
        addStepperKirtan.split("\n").filter((line) => line.trim() !== "").length
      )
    );
  }, [addStepperKirtan]);

  useEffect(() => {
    isDbInitialized &&
      IndexedDBService.getAllData().then((data) =>
        setKirtanData(
          Object.values(data).find((kirtan) => kirtan.id === Number(kirtanId))
        )
      );
  }, [isDbInitialized, kirtanId]);

  useEffect(() => {
    if (kirtanData && Object.keys(kirtanData).length > 0) {
      setEditorData(converter.makeHtml(kirtanData.originalContent));
    }
  }, [kirtanData]);

  return (
    <>
      <div className="width-full relative" style={{ minHeight: "400px" }}>
        <div className="z-50 absolute right-0">
          <Select
            value={selectFontFamily}
            onChange={handleSelectFontFamilyChange}
            sx={{
              height: "40px",
              width: "200px",
              fontSize: "15px",
              fontWeight: "600",
              ":focus": { outline: "none" },
              outline: "none",
            }}
          >
            <MenuItem value="G_BEJOD_4">G_BEJOD_4</MenuItem>
            <MenuItem value="Guj_Bejod">Guj_Bejod</MenuItem>
            <MenuItem value="Guj_Boldy">Guj_Boldy</MenuItem>
            <MenuItem value="Guj_Diamond">Guj_Diamond</MenuItem>
            <MenuItem value="Guj_Favorite_Bold">Guj_Favorite_Bold</MenuItem>
            <MenuItem value="Guj_Favoutite">Guj_Favoutite</MenuItem>
            <MenuItem value="Guj_Hastalikhit">Guj_Hastalikhit</MenuItem>
            <MenuItem value="Guj_Heading">Guj_Heading</MenuItem>
            <MenuItem value="Guj_HeadLine">Guj_HeadLine</MenuItem>
            <MenuItem value="Guj_Khoobsurat">Guj_Khoobsurat</MenuItem>
            <MenuItem value="Guj_Komal">Guj_Komal</MenuItem>
            <MenuItem value="Guj_Najuk">Guj_Najuk</MenuItem>
            <MenuItem value="Guj_Regular">Guj_Regular</MenuItem>
            <MenuItem value="Guj_Regular_BOLD">Guj_Regular_BOLD</MenuItem>
            <MenuItem value="Guj_Saral_Bold">Guj_Saral_Bold</MenuItem>
            <MenuItem value="Guj_Saral_Normal">Guj_Saral_Normal</MenuItem>
            <MenuItem value="Guj_Script">Guj_Script</MenuItem>
            <MenuItem value="Guj_Simple_Bold">Guj_Simple_Bold</MenuItem>
            <MenuItem value="Guj_Simple_Normal">Guj_Simple_Normal</MenuItem>
            <MenuItem value="Guj_Squarish">Guj_Squarish</MenuItem>
            <MenuItem value="Guj_Sulikhit">Guj_Sulikhit</MenuItem>
            <MenuItem value="Guj_Unique">Guj_Unique</MenuItem>
            <MenuItem value="Hin_Devnagari_Bold">Hin_Devnagari_Bold</MenuItem>
            <MenuItem value="Hin_Devnagari_Normal">
              Hin_Devnagari_Normal
            </MenuItem>
            <MenuItem value="Hin_Hastalikhit">Hin_Hastalikhit</MenuItem>
            <MenuItem value="Hin_Khoobsurat">Hin_Khoobsurat</MenuItem>
            <MenuItem value="Hin_Saras">Hin_Saras</MenuItem>
            <MenuItem value="Hin_Script">Hin_Script</MenuItem>
            <MenuItem value="Hin_Simple_Bold">Hin_Simple_Bold</MenuItem>
            <MenuItem value="Hin_Simple_Normal">Hin_Simple_Normal</MenuItem>
            <MenuItem value="Hin_Sundar">Hin_Sundar</MenuItem>
            <MenuItem value="Hin_Tital">Hin_Tital</MenuItem>
            <MenuItem value="Hin_Vaidik">Hin_Vaidik</MenuItem>
            <MenuItem value="Hin_Vankachuka">Hin_Vankachuka</MenuItem>
          </Select>
        </div>
        <div
          className="ckeditor"
          style={{ fontFamily: selectFontFamily, fontSize: "40px" }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onInit={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "500px",
                  editor.editing.view.document.getRoot()
                );
                writer.setStyle(
                  "overflow",
                  "auto", // Add scrolling
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            config={{
              toolbar: {
                items: ["undo", "redo", "|", "bold", "italic", "blockQuote"],
                shouldNotGroupWhenFull: false,
              },
              contentsCss: [CKEditorCss],
            }}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default CkEditorTextArea;
