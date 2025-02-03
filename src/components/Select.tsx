interface SelectProps {
    data: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ data, onChange }) => {
    return (
        <select defaultValue={0} onChange={onChange}>
            <option disabled value={0}>
                Category
            </option>
            {data.map((value, key) => (
                <option key={key} value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}
