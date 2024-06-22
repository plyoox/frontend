"use client";

import { useGuildId } from "@/lib/hooks";
import classes from "@/styles/save-notification.module.css";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
interface Props<T = any> {
  onSave: () => void;
  fn: (id: string, data: T) => Promise<void>;
  data: Partial<T> | null;
  disabled?: boolean;
}

function SaveNotification({ data, fn, onSave, disabled }: Props) {
  const id = useGuildId();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [className, setClassName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We don't care if the className changes, also it can currently only change in this effect.
  useEffect(() => {
    if (data) {
      setVisible(true);
      setClassName(classes.fadeIn);
    } else {
      setClassName(classes.fadeOut);

      // Only hide after animation finished
      setTimeout(() => {
        setVisible(false);
      }, 250);
    }
  }, [data, className]);

  if (!visible) return null;

  return (
    <div className={`${classes.notificationBarWrapper} ${className} pointer-events-none flex justify-center`} ref={ref}>
      <div className={"pointer-events-auto relative z-50 w-10/12 rounded-md bg-black p-2.5 lg:w-1/2"}>
        <div className={"flex items-center justify-between"}>
          <span className={"pr-3"}>You have some unsaved settings. Save to keep them.</span>
          <Button
            color="green"
            disabled={disabled}
            leftSection={<IconCircleCheck />}
            loading={loading}
            onClick={() => {
              setLoading(true);
              fn(id, data)
                .then(() => {
                  onSave();
                  setLoading(false);

                  showNotification({
                    title: "Successfully saved",
                    color: "teal",
                    message: "The config was successfully saved.",
                    autoClose: 1500,
                  });
                })
                .catch((err) => {
                  setLoading(false);
                  showNotification({
                    title: "Error while saving",
                    color: "red",
                    icon: <IconAlertCircle />,
                    message: err.message,
                    autoClose: 3000,
                  });
                });
            }}
            variant="light"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SaveNotification;
