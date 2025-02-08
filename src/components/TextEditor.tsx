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
import { detectFormatting, formatText, insertList } from "../utils/helper";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '"Mulish", sans-serif',
    maxWidth: "630px",
    border: "1px solid #00000021",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f1f1f15c",
    color: "#1e212a",
    position: "relative",
  },
  placeholder: {
    position: "absolute",
    top: "15px",
    left: "15px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#1e212a",
    pointerEvents: "none",
    fontSize: "14px",
    opacity: 0.4,
  },
  editor: {
    width: "630px",
    height: "123px",
    padding: "15px",
    outline: "none",
    overflow: "auto",
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "left",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    fontFamily: '"Mulish", sans-serif',
    fontSize: "12px",
    fontWeight: 400,
    textAlign: "left",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#1e212a",
  },
  button: {
    padding: "6px",
    border: "none",
    borderRadius: "4px",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: '"Acumin Pro", sans-serif',
    fontSize: "18px",
    fontWeight: 400,
    textAlign: "left",
    opacity: 0.8,
  },
};

const activeButtonStyle = { opacity: 1 };

const ButtonGroup = ({
  onFormat,
  onInsertList,
  activeFormats,
}: {
  onFormat: (tag: string) => void;
  onInsertList: (ordered: boolean) => void;
  activeFormats: { [key: string]: boolean };
}) => (
  <div style={styles.header}>
    <button
      style={{
        ...styles.button,
        ...(activeFormats.b ? activeButtonStyle : {}),
      }}
      onClick={() => onFormat("b")}
    >
      <FaBold />
    </button>
    <button
      style={{
        ...styles.button,
        ...(activeFormats.i ? activeButtonStyle : {}),
      }}
      onClick={() => onFormat("i")}
    >
      <FaItalic />
    </button>
    <button
      style={{
        ...styles.button,
        ...(activeFormats.s ? activeButtonStyle : {}),
      }}
      onClick={() => onFormat("s")}
    >
      <FaStrikethrough />
    </button>
    <button style={styles.button}>
      <RxDividerVertical />
    </button>
    <button
      style={{
        ...styles.button,
        ...(activeFormats.ul ? activeButtonStyle : {}),
      }}
      onClick={() => onInsertList(false)}
    >
      <FaListUl />
    </button>
    <button
      style={{
        ...styles.button,
        ...(activeFormats.ol ? activeButtonStyle : {}),
      }}
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
    const selectionChangeHandler = () => detectFormatting(setActiveFormats);
    document.addEventListener("selectionchange", selectionChangeHandler);
    return () =>
      document.removeEventListener("selectionchange", selectionChangeHandler);
  }, []);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
      handleInput();
    }
  }, [initialContent]);

  return (
    <div style={styles.container}>
      <div
        style={{ ...styles.placeholder, display: isEmpty ? "flex" : "none" }}
      >
        <FaListCheck />
        <span>Description</span>
      </div>

      <div
        ref={editorRef}
        contentEditable={true}
        style={styles.editor}
        onInput={handleInput}
      ></div>

      <div style={styles.footer}>
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
