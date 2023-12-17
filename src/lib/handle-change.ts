import { UseRef } from "@/types/react";

export function handleChangeHelper<T>(config: T, data: Partial<T>, oldConfig: UseRef<T>): Partial<T> | null {
  console.log(data);

  const conf = { ...structuredClone(config), ...structuredClone(data) };

  for (const [key, value] of Object.entries(conf) as [keyof Partial<T>, any][]) {
    if (typeof value === "object") {
      // Special case for the logging config `settings` key
      if (Array.isArray(value) && typeof value.at(0) === "object") {
        const oldData = oldConfig.current[key] as never[] | undefined;

        if (oldData !== undefined) {
          const arr = value as never[];

          for (const arrValue of structuredClone(arr)) {
            const hasEqual = oldData.some((oldValue) => JSON.stringify(arrValue) === JSON.stringify(oldValue));

            if (hasEqual) {
              const index = arr.findIndex((a) => JSON.stringify(a) === JSON.stringify(arrValue));
              arr.splice(index, 1);
            }
          }

          // Remove empty array, this is a special case for the logging config
          if (value.length === 0) {
            delete conf[key];
          }
        }
      } else if (JSON.stringify(value) === JSON.stringify(oldConfig.current[key])) {
        delete conf[key];
      }
    } else if (value === oldConfig.current[key]) {
      delete conf[key];
    }

    console.log(key, value, oldConfig.current[key]);
  }

  return Object.keys(conf).length === 0 ? null : conf;
}
