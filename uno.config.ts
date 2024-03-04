import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// @ts-expect-error
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export default defineConfig({
  shortcuts: [
    // { logo: "i-ep:chrome-filled w-6em h-6em transform transition-800 bg-green border-1" },
    // { page: "p-16" },
  ],
  rules: [
    // 字号
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${Number(d)}px` })],
    // [/^w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
    // [/^h-(\d+)$/, ([, d]) => ({ height: `${Number(d)}px` })],
    // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d)}px` })],
    // [/^mb-(\d+)$/, ([, d]) => ({ "margin-bottom": `${Number(d)}px` })],
    // [/^p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      unit: 'px',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '16px',
        height: '16px',
      },
      collections: {
        ep: () => import('@iconify-json/ep/icons.json').then(i => i.default),
        fill: FileSystemIconLoader('./src/assets/svg/fill'),
        icon: FileSystemIconLoader('./src/assets/svg/icon'),
        other: FileSystemIconLoader('./src/assets/svg/other'),
      },
    }),
    presetRemToPx({ baseFontSize: 4 }),
  ],
  content: {
    pipeline: {
      include: ['./src/**/*.{vue,html,jsx,tsx}', './src/**/*.{js,ts}'],
    },
  },
});
