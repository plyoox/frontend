"use client";

import { useEffect } from "react";

function FullView() {
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    const el = document.getElementById("main-content")!;
    el.classList.remove("lg:col-span-3");

    return () => {
      el.classList.add("lg:col-span-3");
    };
  }, [isClient]);

  return null;
}

export default FullView;
