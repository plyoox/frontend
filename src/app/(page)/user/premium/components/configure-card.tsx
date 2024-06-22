"use client";

import LevelCard from "@/app/(page)/user/premium/components/level-card";
import { allowedContrast } from "@/app/(page)/user/premium/utils";
import InfoHeading from "@/components/dashboard/info-heading";
import { useLevelCard } from "@/lib/hooks";
import { saveLevelCard } from "@/lib/requests";
import { UserStoreContext } from "@/stores/user-store";
import { Button, ColorInput, Slider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFileDownload, IconRestore } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

function ConfigureCard() {
  const userStore = useContext(UserStoreContext);

  const levelCard = useLevelCard();

  useEffect(() => {
    if (levelCard.data?.progress_color) {
      const to = levelCard.data.progress_color.at(1);

      setCurrentGradient({ from: `#${levelCard.data.progress_color[0]}`, to: to ? `#${to}` : "" });
    }
  }, [levelCard.data]);

  const [currentXp, setCurrentXp] = useState(100);
  const [currentGradient, setCurrentGradient] = useState<{ to?: string; from: string }>({ from: "#24c689" });

  const [errorColor1, setErrorColor1] = useState<string | null>(null);
  const [errorColor2, setErrorColor2] = useState<string | null>(null);

  if (!userStore.user) return null;

  return (
    <div>
      <div className={"flex flex-wrap gap-10"}>
        <div className={"max-w-fit rounded-sm p-5"} style={{ background: "#313338" }}>
          <LevelCard avatarUrl={userStore.avatarUrl} gradient={currentGradient} user={userStore.user} xp={currentXp} />
        </div>

        <div className={"w-full max-w-[540px]"}>
          <div className={"mb-6"}>
            <InfoHeading description={""} label={"Change XP"} />
            <Slider
              defaultValue={100}
              marks={[
                { value: 0, label: "0%" },
                { value: 50, label: "50%" },
                { value: 100, label: "100%" },
              ]}
              onChange={setCurrentXp}
            />
          </div>

          <ColorInput
            error={errorColor1}
            format={"hex"}
            label={"From"}
            onChangeEnd={(val) => {
              if (allowedContrast(val)) {
                setErrorColor1(null);
                setCurrentGradient((c) => ({ from: val, to: c?.to }));
              } else {
                setErrorColor1("Color is too similar to background");
              }
            }}
            placeholder={"Select starting color"}
            value={currentGradient.from}
            withEyeDropper={false}
          />
          <ColorInput
            error={errorColor2}
            format={"hex"}
            label={"To"}
            onChangeEnd={(val) => {
              if (allowedContrast(val)) {
                setErrorColor2(null);
                setCurrentGradient((c) => ({ from: c?.from, to: val }));
              } else {
                setErrorColor2("Color is too similar to background");
              }
            }}
            placeholder={"Select end color"}
            value={currentGradient.to}
            withEyeDropper={false}
          />
        </div>
      </div>

      <div className={"mt-2"}>
        <Button
          className={"mr-2"}
          color={"plyoox"}
          leftSection={<IconFileDownload />}
          onClick={() => {
            saveLevelCard({
              from: currentGradient.from,
              to: currentGradient.to === "" ? undefined : currentGradient.to,
            })
              .then(() => {
                notifications.show({ title: "Level card saved", message: "Your level card has been saved" });
              })
              .catch((e) => {
                notifications.show({
                  title: "Failed to save level card",
                  message: e.response?.data?.message,
                  color: "red",
                });
              });
          }}
        >
          Save
        </Button>

        <Button
          leftSection={<IconRestore />}
          onClick={() => {
            setCurrentGradient({ from: "#24c689", to: "" });
            setCurrentXp(100);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default observer(ConfigureCard);
