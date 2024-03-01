import { defineConfig, presetUno, presetIcons, presetAttributify } from "unocss";
import { resolve } from "node:path";
import presetRemToPx from "@unocss/preset-rem-to-px";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

const iconDirectory = resolve(__dirname, "src/assets/icons");

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    // { logo: "i-ep:chrome-filled w-6em h-6em transform transition-800 bg-green border-1" },
    // { page: "p-16" },
  ],
  rules: [
    // ...your custom rules
    // [/^w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
    // [/^h-(\d+)$/, ([, d]) => ({ height: `${Number(d)}px` })],
    // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d)}px` })],
    // [/^mb-(\d+)$/, ([, d]) => ({ "margin-bottom": `${Number(d)}px` })],
    // [/^p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
  ],
  presets: [
    presetUno(),
    presetRemToPx(),
    // presetIcons({
    //   /* options */
    // }),
    // 类名属性化，如：`p-4` => `padding: 1rem;`
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
      collections: {
        custom: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
});
