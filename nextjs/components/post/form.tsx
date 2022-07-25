import { type FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextInput } from "@/components/shared/text-input";

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
    <form onSubmit={handleSubmit} className="my-2">
      <div>
        <Label htmlFor="title">Title</Label>
        <br />
        <TextInput
          id="title"
          value={formData.title}
          required
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, title: value }));
          }}
        />
      </div>

      <div>
        <Checkbox
          id="published"
          checked={formData.published}
          label="Published"
          onChange={() => {
            setFormData((prev) => ({ ...prev, published: !prev.published }));
          }}
        />
      </div>

      <div className="my-2">
        <SubmitButton label={buttonText} />
      </div>
    </form>
  );
}
