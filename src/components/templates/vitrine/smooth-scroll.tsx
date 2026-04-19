"use client";

import { useEffect } from "react";

/**
 * Intercepts anchor clicks (href="#...") in the generated site and scrolls
 * programmatically WITHOUT changing the URL hash. This prevents the parent
 * window from scrolling when the template is rendered inside an iframe
 * (dashboard preview), which the browser does by default on hash changes.
 */
export function SmoothScroll() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = href.slice(1);
      const element = document.getElementById(id);
      if (!element) return;

      e.preventDefault();

      const headerEl = document.querySelector("header") as HTMLElement | null;
      const headerOffset = headerEl ? headerEl.offsetHeight + 12 : 80;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const y =
        element.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: y,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
