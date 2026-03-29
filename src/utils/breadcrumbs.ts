export const generateBreadcrumbs = (
  pathname: string,
  exploreTab?: string
) => {
  const segments = pathname.split("/").filter(Boolean);

  const nameMap: Record<string, string> = {
    home: "Home",
    explore: "Explore",
    "creator-profile": "Creator Profile",
    "post-details": "Post",
    "product-details": "Product",
    membership: "Membership",
    about: "About",
  };

  const breadcrumbs = segments.map((segment, index) => {
    return {
      label: nameMap[segment] || segment,
      href: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  // 👉 handle query tab (important for you)
  if (pathname === "/explore" && exploreTab === "browse") {
    breadcrumbs.push({
      label: "Browse Creators",
      href: "#",
    });
  }

  return breadcrumbs;
};