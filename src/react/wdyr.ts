/// <reference types="@welldone-software/why-did-you-render" />
import preact from "preact/compat";

if (import.meta.env.DEV) {
  const whyDidYouRender = await import("@welldone-software/why-did-you-render");
  whyDidYouRender.default(preact, {
    trackAllPureComponents: true,
  });
}
