"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Home Link */}
      <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
        <Link href="/" className="item-link">
          Home
        </Link>
      </li>

      {/* Shop Link: Navigates directly to shop-infinite-scrolling */}
      <li className={`menu-item ${pathname === "/shop-infinite-scrolling" ? "active" : ""}`}>
        <Link href="/shop-infinite-scrolling" className="item-link">
          Shop
        </Link>
      </li>

      {/* Categories Link: Renamed from Products, routes to shop-categories-top */}
      <li className={`menu-item ${pathname === "/shop-categories-top" ? "active" : ""}`}>
        <Link href="/shop-categories-top" className="item-link">
          Categories
        </Link>
      </li>

      {/* Blog Link as an additional example */}
      <li className={`menu-item ${pathname === "/blog-default" ? "active" : ""}`}>
        <Link href="/blog-default" className="item-link">
          Blogs
        </Link>
      </li>

      {/* Featured Products Link as an additional example */}
      <li className={`menu-item ${pathname.startsWith("/coming-soon") ? "active" : ""}`}>
        <Link href="/coming-soon" className="item-link">
          Featured
        </Link>
      </li>
    </>
  );
}
