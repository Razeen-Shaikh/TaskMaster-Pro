import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/CustomSelect.css";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

interface CustomSelectProps {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
  children?: React.ReactNode;
  className?: string;
  hideText?: boolean;
  editOrDelete?: boolean;
  style?: React.CSSProperties;
  direction?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onSelect,
  children,
  className = "",
  hideText = false,
  editOrDelete = false,
  style = {},
  direction = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="flex-row align-center">
        <button className={className} style={style} onClick={toggleDropdown}>
          {children}
        </button>
        {selected && !hideText && <span>{selected}</span>}
      </div>

      {isOpen && !editOrDelete && (
        <div className={`dropdown-content ${direction === "top" ? "top" : ""}`}>
          {options.map((option, index) => (
            <a key={index} onClick={() => handleSelect(option)}>
              {option}
            </a>
          ))}
        </div>
      )}

      {isOpen && editOrDelete && (
        <div className="dropdown-content">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={() => handleSelect("Edit")}
          >
            <FaEdit />
            <p style={{ marginLeft: "0.5rem" }}>Edit</p>
          </a>
          <a
            style={{
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={() => handleSelect("Delete")}
          >
            <FaDeleteLeft />
            <p style={{ marginLeft: "0.5rem" }}>Delete</p>
          </a>
        </div>
      )}
    </div>
  );
};
