import { type FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

export type IOnSubmit = (
  args: {
    title: string;
    published: boolean;
  },
) => Promise<void>;

interface Props {
  buttonText: string;
  init?: {
    title: string;
    published: boolean;
  };
  onSubmit: IOnSubmit;
}

interface FormProps {
  title: string;
  published: boolean;
}

export function PostForm({ buttonText, init, onSubmit }: Props) {
  const [formData, setFormData] = useState<FormProps>({
    title: init?.title ?? "",
    published: init?.published ?? false,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { title } = formData;

    if (!title.trim()) {
      toast.error("`Title` must be present!");
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          name="title"
          id="title"
          data-testid="title"
          value={formData.title}
          required
          onChange={({ target: { value } }) => {
            setFormData((prev) => ({ ...prev, title: value }));
          }}
        />
      </div>

      <div>
        <label htmlFor="published">
          <input
            type="checkbox"
            name="published"
            id="published"
            data-testid="published"
            checked={formData.published}
            onChange={() => {
              setFormData((prev) => ({ ...prev, published: !prev.published }));
            }}
          />
          Published
        </label>
      </div>

      <input type="submit" data-testid="submit" value={buttonText} />
    </form>
  );
}
