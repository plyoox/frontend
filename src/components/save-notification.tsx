"use client";

import { Button } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useGuildId } from "@/lib/hooks";

import { useEffect, useState } from "react";
import classes from "@/styles/save-notification.module.css";

interface Props<T = any> {
  onSave: () => void;
  fn: (id: string, data: T) => Promise<void>;
  data: Partial<T> | null;
}

function SaveNotification({ data, fn, onSave }: Props) {
  const id = useGuildId();
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    // To prevent the first render, which would cause a flicker
    if (!className && !data) return;

    if (data) {
      setClassName(classes.fadeIn);
    } else {
      setClassName(classes.fadeOut);
    }
  }, [data, className]);

  return (
    <div className={`${classes.notificationBar} ${className} w-10/12 rounded-md bg-black p-2.5 lg:w-1/2`}>
      <div className={"flex items-center justify-between"}>
        <span className={"pr-2.5"}>You have some unsaved settings. Save to keep them.</span>
        <Button
          color="green"
          leftSection={<IconCircleCheck />}
          onClick={() => {
            fn(id, data)
              .then(() => {
                onSave();

                showNotification({
                  title: "Successfully saved",
                  color: "teal",
                  message: "The config was successfully saved.",
                  autoClose: 1500,
                });
              })
              .catch((err) => {
                showNotification({
                  title: "Error while saving",
                  color: "red",
                  icon: <IconAlertCircle />,
                  message: err.message,
                  autoClose: 3000,
                });
              });
          }}
          variant="outline"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default SaveNotification;
