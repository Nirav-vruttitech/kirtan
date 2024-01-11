import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Showdown from "showdown";
import TurndownService from "turndown";
import IndexedDBService from "../Utils/DBConfig";
import FontList from "../Utils/FontsList.json";
import CKEditorCss from "./../ckeditor.css";

const CkEditorTextArea = ({ getEditorContent, getEditorFont, kirtanId }) => {
  const converter = new Showdown.Converter();

  const turndownService = new TurndownService();

  const [kirtanData, setKirtanData] = useState({});

  const [editorData, setEditorData] = useState("");

  const [selectFontFamily, setSelectFontFamily] = useState(
    useSelector((state) => state.settings.fontFamily)
  );

  const isDbInitialized = useSelector((state) => state.db.isDbInitialized);

  const handleSelectFontFamilyChange = (event) => {
    setSelectFontFamily(event.target.value);
    getEditorFont(event.target.value);
  };

  const handleEditorChange = async (event, editor) => {
    const data = editor.getData();
    const markdown = turndownService.turndown(data);
    const latestData = markdown === "" ? "fgg" : markdown;
    getEditorContent(latestData);
  };

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
    <div className="width-full relative overflow-y-auto max-h-screen">
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
          {FontList.map((font) => (
            <MenuItem value={font.value}>{font.text}</MenuItem>
          ))}
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
                "auto",
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
  );
};

export default CkEditorTextArea;
