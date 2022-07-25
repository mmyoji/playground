interface Props {
  id: string;
  name?: string;
  onChange: (value: string) => void;
  value: string;
  required?: boolean;
}

export function TextInput({ id, name, value, onChange, required }: Props) {
  return (
    <input
      name={name ?? id}
      id={id}
      data-testid={id}
      value={value}
      required={required ?? false}
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
      className="px-3 py-1.5 border border-solid border-gray-300 rounded"
    />
  );
}
