import type { UseRef } from "@/types/react";

export function handleChangeHelper<T extends Record<keyof T, unknown>>(
  config: T,
  data: Partial<T>,
  oldConfig: UseRef<T>,
): Partial<T> | null {
  const conf: T = structuredClone({ ...config, ...data });

  for (const [key, value] of Object.entries(conf) as [keyof T, unknown][]) {
    if (value === oldConfig.current[key]) {
      delete conf[key];
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (JSON.stringify(value) === JSON.stringify(oldConfig.current[key])) {
          delete conf[key];
        }
      } else if (value !== null) {
        const oldData = oldConfig.current[key] as Record<string, unknown> | undefined;

        if (oldData) {
          const obj = value as Record<string, unknown>;

          for (const [objKey, objValue] of Object.entries(obj)) {
            if (JSON.stringify(objValue) === JSON.stringify(oldData[objKey])) {
              delete obj[objKey];
            }
          }
        }
      }
    } else if (JSON.stringify(value) === JSON.stringify(oldConfig.current[key])) {
      delete conf[key];
    }

    // Remove empty objects
    if (typeof value === "object" && value !== null && Object.keys(value).length === 0 && !Array.isArray(value)) {
      delete conf[key];
    }
  }

  return Object.keys(conf).length === 0 ? null : conf;
}
