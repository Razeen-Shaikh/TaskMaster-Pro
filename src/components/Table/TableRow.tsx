export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
  style,
}) => (
  <div className={`table-row ${className}`} style={style}>
    {children}
  </div>
);
