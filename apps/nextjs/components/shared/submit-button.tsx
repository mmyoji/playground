interface Props {
  label: string;
}

export function SubmitButton({ label }: Props) {
  return (
    <input
      type="submit"
      data-testid="submit"
      value={label}
      className="p-2 text-green-900 hover:text-green-700 bg-emerald-200 hover:bg-emerald-100 rounded-md border-2 border-solid border-emerald-200 hover:border-emerald-100"
    />
  );
}
