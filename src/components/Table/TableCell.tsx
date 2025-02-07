import React from "react";

export interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
  style,
  onClick,
}) => (
  <div className={`table-cell ${className}`} style={style} onClick={onClick}>
    {children}
  </div>
);
