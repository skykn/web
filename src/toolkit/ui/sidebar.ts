/** 具体栏目页链接形态：/categories/<栏目名>/（不含 /categories/ 总览页） */
const CATEGORY_LINK_PATTERN = /^\/categories\/[^/]+\/?$/;

/** 判断是否为指向单个栏目的导航链接（侧栏菜单需隐藏这类链接） */
export function isCategoryNavLink(href?: string): boolean {
  return typeof href === "string" && CATEGORY_LINK_PATTERN.test(href);
}

/** 过滤掉导航项中的具体栏目链接，保留首页/总览/下拉等入口 */
export function filterCategoryNavLinks<T extends { href?: string }>(links: readonly T[] = []): T[] {
  return links.filter((link) => !isCategoryNavLink(link.href));
}

export interface SidebarMenuActiveInput {
  targetPathname: string;
  currentPathname: string;
  targetHostname: string;
  currentHostname: string;
}

export function isSidebarMenuItemActive({
  targetPathname,
  currentPathname,
  targetHostname,
  currentHostname,
}: SidebarMenuActiveInput): boolean {
  const currentPathWithoutIndex = currentPathname.replace("index.html", "");

  const isSamePath =
    targetPathname === currentPathname || targetPathname === currentPathWithoutIndex;

  const isSubPath = currentPathname.startsWith(targetPathname) && targetPathname !== "/";

  return targetHostname === currentHostname && (isSamePath || isSubPath);
}
