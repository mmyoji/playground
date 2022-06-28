/**
 * @vitest-environment node
 */
import { describe, expect, it } from "vitest";
import { postValidator } from "./post.validator";

describe("validate", () => {
  const { validate: subject } = postValidator;

  it("returns false without title or published", async () => {
    {
      const result = await subject({ title: "foo" });
      expect(result).toBe(false);
    }

    {
      const result = await subject({ published: true });
      expect(result).toBe(false);
    }
  });

  it("returns false when title is not string", async () => {
    const result = await subject({
      // @ts-ignore
      title: null,
      published: true,
    });
    expect(result).toBe(false);
  });

  it("returns false when published is not boolean", async () => {
    const result = await subject({
      title: "foo",
      // @ts-ignore
      published: "false",
    });
    expect(result).toBe(false);
  });

  it("returns false when title is blank string", async () => {
    const result = await subject({
      title: "",
      published: false,
    });
    expect(result).toBe(false);
  });

  it("returns true when params is exepcted one", async () => {
    const result = await subject({
      title: "hoge",
      published: false,
    });
    expect(result).toBe(true);
  });
});
