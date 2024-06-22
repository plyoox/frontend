"use client";

import { useEffect } from "react";

function FullView() {
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    // If it is rendered on the server, return
    if (!isClient) {
      return;
    }

    const el = document.getElementById("main-content");
    if (el === null) {
      return;
    }

    el.classList.remove("lg:col-span-3");

    return () => {
      el.classList.add("lg:col-span-3");
    };
  }, [isClient]);

  return null;
}

export default FullView;
