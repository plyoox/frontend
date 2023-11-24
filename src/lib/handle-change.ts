import { UseRef } from "@/types/react";

export function handleChangeHelper<T>(config: T, data: Partial<T>, oldConfig: UseRef<T>): Partial<T> {
  const conf = { ...config!, ...data };

  for (const [key, value] of Object.entries(conf) as [keyof Partial<T>, any][]) {
    if (typeof value === "object") {
      if (JSON.stringify(value) === JSON.stringify(oldConfig.current[key])) {
        delete conf[key];
      }
    } else if (value === oldConfig.current[key]) {
      delete conf[key];
    }
  }

  return conf;
}
