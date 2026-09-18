// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "skykn blog",
  brand: {
    title: "skykn blog",
    subtitle: "skykn 的个人博客",
    logo: "✨",
  },
  sidebar: {
    author: "skykn",
    description: "记录技术、生活与思考。",
  },
  footer: {
    since: 2026,
    icp: {
      enable: false,
      icpnumber: "",
      icpurl: "",
    },
  },
});
