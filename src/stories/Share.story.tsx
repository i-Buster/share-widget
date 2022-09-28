import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Share", module)
  .add("with emoji", () => (
    <button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
