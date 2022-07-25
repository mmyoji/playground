interface Props {
  id: string;
  name?: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function Checkbox({ id, name, checked, onChange, label }: Props) {
  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        name={name ?? id}
        id={id}
        data-testid={id}
        checked={checked}
        onChange={() => {
          onChange();
        }}
      />
      <span className="ml-1">{label}</span>
    </label>
  );
}
