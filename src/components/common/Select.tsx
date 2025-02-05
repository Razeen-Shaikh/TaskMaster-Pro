interface SelectProps {
    name: string;
    title: string;
    data: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ name, title, data, onChange }) => {
    return (
        <select name={name} defaultValue="" onChange={onChange}>
            <option disabled value="">
                {title}
            </option>
            {data.map((value, key) => (
                <option key={key} value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}
