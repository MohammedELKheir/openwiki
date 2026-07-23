import { beforeEach, expect, test, vi } from "vitest";

vi.mock("../src/mermaid/dom-shim.ts", () => ({
  ensureDomGlobals: vi.fn(),
}));

import { ensureDomGlobals } from "../src/mermaid/dom-shim.ts";
import { loadMermaid } from "../src/mermaid/validate.ts";

beforeEach(() => {
  vi.mocked(ensureDomGlobals).mockReset();
});

test("surfaces an unexpected Mermaid runtime initialization failure", async () => {
  vi.mocked(ensureDomGlobals).mockRejectedValueOnce(
    new Error("broken DOM runtime"),
  );

  await expect(loadMermaid()).rejects.toThrow("broken DOM runtime");
});
