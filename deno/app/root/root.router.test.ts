import { testing } from "oak";
import { assertEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { rootRouter } from "./root.router.ts";

describe("rootRouter", () => {
  it("GET /", async () => {
    const ctx = testing.createMockContext({
      method: "GET",
      path: "/",
    });
    const next = testing.createMockNext();
    const mw = rootRouter.routes();

    await mw(ctx, next);

    assertEquals(ctx.response.body, "Hello!");
    assertEquals(ctx.response.status, 200);
  });
});
