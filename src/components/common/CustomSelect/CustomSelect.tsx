import React, { useEffect, useRef, useState } from "react";
import "./CustomSelect.css";

interface CustomSelectProps {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
  children: React.ReactNode;
  className?: string;
  hideText?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onSelect,
  children,
  className = "",
  hideText = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    console.log({ isOpen });
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    console.log(option);
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
        <button className={className} onClick={toggleDropdown}>
          {children}
        </button>
        {selected && !hideText && <span>{selected}</span>}
      </div>

      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <a key={index} onClick={() => handleSelect(option)}>
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
