import styles from "./submit-button.module.css";

interface Props {
  label: string;
}

export function SubmitButton({ label }: Props) {
  return (
    <input
      type="submit"
      data-testid="submit"
      value={label}
      className={styles.button}
    />
  );
}
