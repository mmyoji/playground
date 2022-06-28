import userEvent from "@testing-library/user-event";

import { cleanup, render } from "@testing-library/react";
import { ReactElement } from "react";

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

function teardown() {
  cleanup();
}

export { setup, teardown };
