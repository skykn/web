import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from "unocss";
import themeConfig from "./src/theme.config";

// Node ≥22 强制 JSON import attributes，@unocss/preset-icons 内部动态 import
// icons.json 会触发 ERR_IMPORT_ATTRIBUTE_MISSING 且被静默吞掉，导致所有
// i-ri-* 图标规则不生成（导航栏右侧"能点击但不显示"）。这里显式同步读文件绕过。
const require = createRequire(import.meta.url);
const riIconsPath = require.resolve("@iconify-json/ri/icons.json");

function normalizeIconName(icon: string): string {
  return icon.startsWith("i-") ? icon : `i-ri-${icon}`;
}

function pushNormalizedIcon(target: string[], icon?: string) {
  if (!icon) return;
  target.push(normalizeIconName(icon));
}

function collectConfigIcons() {
  const icons: string[] = [];

  themeConfig.nav.forEach((item) => {
    pushNormalizedIcon(icons, item.icon);
    item.dropbox?.items?.forEach((subItem) => {
      pushNormalizedIcon(icons, subItem.icon);
    });
  });

  if (themeConfig.sidebar?.social) {
    Object.values(themeConfig.sidebar.social).forEach((value) => {
      pushNormalizedIcon(icons, value.icon);
    });
  }

  if (themeConfig.sidebar?.menu) {
    Object.values(themeConfig.sidebar.menu).forEach((value) => {
      pushNormalizedIcon(icons, value.icon);
    });
  }

  // 预留：若未来在 friends.links 中引入 icon 字段，这里会自动纳入。
  if (themeConfig.friends?.links) {
    themeConfig.friends.links.forEach((link) => {
      // eslint-disable-next-line no-unsafe-type-assertion
      const icon = (link as { icon?: string }).icon;
      pushNormalizedIcon(icons, icon);
    });
  }

  return icons;
}

const iconSafeList = [
  ...collectConfigIcons(),
  // 页面内固定使用的图标（避免后续模板改造期间被裁剪）
  "i-ri-flag-line",
  "i-ri-file-line",
  // 导航栏右侧固定图标（SolidJS tsx 中渲染），防御性 safelist 确保生成
  "i-ri-dice-line",
  "i-ri-moon-line",
  "i-ri-sun-line",
  "i-ri-search-line",
  // 外链标识图标：由 wrapExternalLinks 在构建时动态注入 HTML，
  // UnoCSS 静态扫描源文件无法发现，需显式 safelist
  "i-ri-external-link-line",
].map(normalizeIconName);

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      collections: {
        // 同步读文件加载图标集合，绕过 Node JSON import attribute 限制（见顶部注释）
        ri: () => JSON.parse(readFileSync(riIconsPath, "utf8")),
      },
    }),
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // 灰阶：支持 text-grey-4 / border-grey-3 / bg-grey-1 等
      grey: {
        0: "var(--grey-0)",
        1: "var(--grey-1)",
        2: "var(--grey-2)",
        3: "var(--grey-3)",
        4: "var(--grey-4)",
        5: "var(--grey-5)",
        6: "var(--grey-6)",
        7: "var(--grey-7)",
        8: "var(--grey-8)",
        9: "var(--grey-9)",
      },

      // 语义色：支持 text-primary / text-color-link / bg-body-bg-shadow 等
      primary: "var(--primary-color)",
      "color-link": "var(--primary-color)",
      color: "var(--text-color)",
      "text-muted": "var(--text-color-muted)",
      "text-subtle": "var(--text-color-subtle)",
      "header-text": "var(--header-text-color)",
      "body-bg-shadow": "var(--body-bg-shadow)",
      "box-bg-shadow": "var(--box-bg-shadow)",
      "border-muted": "var(--border-color-muted)",

      // 调色盘原子色：支持 text-color-blue / bg-color-red 等
      "color-red": "var(--color-red)",
      "color-pink": "var(--color-pink)",
      "color-orange": "var(--color-orange)",
      "color-yellow": "var(--color-yellow)",
      "color-green": "var(--color-green)",
      "color-aqua": "var(--color-aqua)",
      "color-blue": "var(--color-blue)",
      "color-purple": "var(--color-purple)",
      "color-grey": "var(--color-grey)",
    },
  },
  safelist: [...new Set(iconSafeList)],
});
