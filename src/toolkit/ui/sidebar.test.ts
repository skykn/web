import { describe, expect, it } from "vitest";
import { filterCategoryNavLinks, isCategoryNavLink, isSidebarMenuItemActive } from "./sidebar";

describe("isCategoryNavLink", () => {
  it("recognizes single category links", () => {
    expect(isCategoryNavLink("/categories/资讯新闻/")).toBe(true);
    expect(isCategoryNavLink("/categories/tech")).toBe(true);
  });

  it("keeps category overview and other entries", () => {
    expect(isCategoryNavLink("/categories/")).toBe(false);
    expect(isCategoryNavLink("/categories")).toBe(false);
    expect(isCategoryNavLink("/")).toBe(false);
    expect(isCategoryNavLink(undefined)).toBe(false);
  });
});

describe("filterCategoryNavLinks", () => {
  it("drops category items and keeps the rest", () => {
    const links = [
      { href: "/", text: "首页" },
      { href: "/categories/资讯新闻/", text: "资讯新闻" },
      { href: "/categories/", text: "分类" },
      { href: "/about/", text: "关于" },
    ];
    expect(filterCategoryNavLinks(links).map((item) => item.text)).toEqual([
      "首页",
      "分类",
      "关于",
    ]);
  });

  it("returns empty array for undefined input", () => {
    expect(filterCategoryNavLinks()).toEqual([]);
  });
});

describe("isSidebarMenuItemActive", () => {
  it("returns true when pathname is exactly the same", () => {
    expect(
      isSidebarMenuItemActive({
        targetPathname: "/archives/",
        currentPathname: "/archives/",
        targetHostname: "example.com",
        currentHostname: "example.com",
      }),
    ).toBe(true);
  });

  it("returns true when current pathname has index.html", () => {
    expect(
      isSidebarMenuItemActive({
        targetPathname: "/archives/",
        currentPathname: "/archives/index.html",
        targetHostname: "example.com",
        currentHostname: "example.com",
      }),
    ).toBe(true);
  });

  it("returns true for sub path matches except root target", () => {
    expect(
      isSidebarMenuItemActive({
        targetPathname: "/archives/",
        currentPathname: "/archives/2025/",
        targetHostname: "example.com",
        currentHostname: "example.com",
      }),
    ).toBe(true);

    expect(
      isSidebarMenuItemActive({
        targetPathname: "/",
        currentPathname: "/archives/2025/",
        targetHostname: "example.com",
        currentHostname: "example.com",
      }),
    ).toBe(false);
  });

  it("returns false when hostnames are different", () => {
    expect(
      isSidebarMenuItemActive({
        targetPathname: "/archives/",
        currentPathname: "/archives/",
        targetHostname: "example.com",
        currentHostname: "another.com",
      }),
    ).toBe(false);
  });
});
