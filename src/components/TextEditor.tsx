import React, { useEffect, useRef, useState } from "react";
import { RxDividerVertical } from "react-icons/rx";
import {
  FaListOl,
  FaListUl,
  FaBold,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import "../assets/styles/TextEditor.css";
import { detectFormatting, formatText, insertList } from "../utils/helper";

const ButtonGroup = ({
  onFormat,
  onInsertList,
  activeFormats,
}: {
  onFormat: (tag: string) => void;
  onInsertList: (ordered: boolean) => void;
  activeFormats: { [key: string]: boolean };
}) => (
  <div className="text-editor-header">
    <button
      className={`text-editor-button ${activeFormats.b ? "active" : ""}`}
      onClick={() => onFormat("b")}
    >
      <FaBold />
    </button>
    <button
      className={`text-editor-button ${activeFormats.i ? "active" : ""}`}
      onClick={() => onFormat("i")}
    >
      <FaItalic />
    </button>
    <button
      className={`text-editor-button ${activeFormats.s ? "active" : ""}`}
      onClick={() => onFormat("s")}
    >
      <FaStrikethrough />
    </button>
    <button className="text-editor-button">
      <RxDividerVertical />
    </button>
    <button
      className={`text-editor-button ${activeFormats.ul ? "active" : ""}`}
      onClick={() => onInsertList(false)}
    >
      <FaListUl />
    </button>
    <button
      className={`text-editor-button ${activeFormats.ol ? "active" : ""}`}
      onClick={() => onInsertList(true)}
    >
      <FaListOl />
    </button>
  </div>
);

export const TextEditor = ({
  initialContent = "",
  onChange,
}: {
  initialContent?: string;
  onChange?: (newContent: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const [activeFormats, setActiveFormats] = useState<{
    [key: string]: boolean;
  }>({
    b: false,
    i: false,
    s: false,
    ul: false,
    ol: false,
  });

  const maxChars = 300;

  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      setCharCount(text.length);
      setIsEmpty(text.trim() === "");
      if (onChange) {
        onChange(text);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", () =>
      detectFormatting(setActiveFormats)
    );
    return () =>
      document.removeEventListener("selectionchange", () =>
        detectFormatting(setActiveFormats)
      );
  }, []);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
      handleInput();
    }
  }, [initialContent]);

  return (
    <div className="text-editor-container">
      {isEmpty && (
        <div className="text-editor-placeholder">
          <FaListCheck />
          <span>Description</span>
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable="true"
        className="text-editor"
        onInput={handleInput}
      ></div>
      <div className="text-editor-footer">
        <ButtonGroup
          onFormat={(tag) =>
            formatText(tag, () => detectFormatting(setActiveFormats))
          }
          onInsertList={(ordered) =>
            insertList(ordered, () => detectFormatting(setActiveFormats))
          }
          activeFormats={activeFormats}
        />
        <div style={{ opacity: 0.4 }}>
          {charCount}/{maxChars} characters
        </div>
      </div>
    </div>
  );
};
