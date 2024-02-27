import { defineConfig, presetUno, presetIcons, presetAttributify } from "unocss";
import { resolve } from "node:path";
import presetRemToPx from "@unocss/preset-rem-to-px";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

const iconDirectory = resolve(__dirname, "icons");

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    { logo: "i-ep:chrome-filled w-6em h-6em transform transition-800 bg-green border-1" },
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
