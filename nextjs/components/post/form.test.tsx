import { afterEach, describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import { toast } from "react-toastify";
import { setup, teardown } from "@/lib/test-utils";
import { IOnSubmit, PostForm } from "./form";

vi.mock("react-toastify", () => {
  return {
    toast: {
      error: vi.fn(),
    },
  };
});

const dummyHandleSubmit: IOnSubmit = (_args) => Promise.resolve(undefined);

describe("<PostForm>", () => {
  const _setup = (props: Partial<ComponentProps<typeof PostForm>>) => {
    const mockHandleSubmit = props.onSubmit ||
      vi.fn().mockImplementation(dummyHandleSubmit);
    return {
      mockHandleSubmit,
      ...setup(
        <PostForm
          {...props}
          buttonText={props.buttonText || "Submit"}
          onSubmit={mockHandleSubmit}
        />,
      ),
    };
  };

  afterEach(() => {
    teardown();
    vi.clearAllMocks();
  });

  it("matches former snapshot", async () => {
    const { container } = _setup({});

    expect(container).toMatchSnapshot();
  });

  it("renders a form", () => {
    const buttonText = "Click Me!";
    const { getByLabelText, getByDisplayValue, getByTestId } = _setup({
      buttonText,
    });

    const titleInput = getByTestId("title");
    const publishedInput = getByTestId("published");

    expect(getByLabelText("Title")).toBeDefined();
    expect(getByLabelText("Published")).toBeDefined();
    expect(titleInput.getAttribute("value")).toBe("");
    expect(publishedInput.hasAttribute("checked")).toBe(false);
    expect(getByDisplayValue(buttonText)).toBeDefined();
  });

  it("emits error message when values are invalid", async () => {
    const { mockHandleSubmit, user, getByTestId } = _setup({});

    const titleInput = getByTestId("title");
    await user.type(titleInput, " ");

    const submitButton = getByTestId("submit");
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toBeCalledTimes(1);
      expect(toast.error).toBeCalledWith("`Title` must be present!");
    });
    expect(mockHandleSubmit).toBeCalledTimes(0);
  });

  it("submits form data", async () => {
    const { mockHandleSubmit, user, getByTestId } = _setup({});

    const titleInput = getByTestId("title");
    await user.type(titleInput, "My Title");

    const publishedInput = getByTestId("published");
    await user.click(publishedInput);

    const submitButton = getByTestId("submit");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toBeCalledTimes(1);
      expect(mockHandleSubmit).toBeCalledWith({
        title: "My Title",
        published: true,
      });
    });
    expect(toast.error).toBeCalledTimes(0);
  });

  it("sets initial values when init is passed", async () => {
    const init = {
      title: "Dr. Stone",
      published: true,
    };
    const { getByTestId } = _setup({ init });

    const titleInput = getByTestId("title");
    const publishedInput = getByTestId("published");

    expect(titleInput.getAttribute("value")).toBe(init.title);
    expect(publishedInput.hasAttribute("checked")).toBe(true);
  });
});
