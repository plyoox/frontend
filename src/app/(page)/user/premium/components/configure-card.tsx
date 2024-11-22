"use client";

import LevelCard from "@/app/(page)/user/premium/components/level-card";
import { allowedContrast } from "@/app/(page)/user/premium/utils";
import InfoHeading from "@/components/dashboard/info-heading";
import { useLevelCard } from "@/lib/hooks";
import { saveLevelCard } from "@/lib/requests";
import { UserStoreContext } from "@/stores/user-store";
import { Button, ColorInput, FileButton, Slider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFileDownload, IconFileUpload, IconRestore } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useEffect, useState } from "react";

function ConfigureCard() {
  const userStore = useContext(UserStoreContext);

  const levelCard = useLevelCard();

  useEffect(() => {
    if (levelCard.data?.progress_color) {
      const to = levelCard.data.progress_color.at(1);

      setCurrentGradient({ from: `#${levelCard.data.progress_color[0]}`, to: to ? `#${to}` : "" });
    }
  }, [levelCard.data]);

  const [currentXp, setCurrentXp] = useState(50);
  const [currentGradient, setCurrentGradient] = useState<{ to?: string; from: string }>({ from: "#24c689" });

  const [errorColor1, setErrorColor1] = useState<string | null>(null);
  const [errorColor2, setErrorColor2] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleFileUpload = useCallback((file: File | null) => {
    setImageError(null);

    if (file === null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const { width, height } = image;

        if (width !== 500 || height !== 170) {
          setImageError("Image must be 500px * 170px");
        } else {
          setImageData(URL.createObjectURL(file));
        }
      };
      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }, []);
  const resetCard = useCallback(() => {
    setCurrentGradient({ from: "#24c689", to: "" });
    setCurrentXp(50);
    setImageError(null);
  }, []);

  if (!userStore.user) return null;

  return (
    <div>
      <div className={"flex flex-wrap gap-10"}>
        <div className={"max-w-fit rounded-sm p-5"} style={{ background: "#313338" }}>
          <LevelCard
            backgroundImage={imageData}
            avatarUrl={userStore.avatarUrl}
            gradient={currentGradient}
            user={userStore.user}
            xp={currentXp}
          />
        </div>

        <div className={"w-full max-w-[540px]"}>
          <div className={"mb-6"}>
            <InfoHeading description={""} label={"Change XP"} />
            <Slider
              value={currentXp}
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
        <FileButton accept={"image/png,image/jpeg"} onChange={handleFileUpload}>
          {(props) => (
            <Button {...props} className={"mr-2"} color={"plyoox"} variant={"outline"} leftSection={<IconFileUpload />}>
              Background Image
            </Button>
          )}
        </FileButton>
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
        <Button leftSection={<IconRestore />} onClick={resetCard}>
          Reset
        </Button>
      </div>

      <span className={"text-red-300 text-sm"}>{imageError}</span>
    </div>
  );
}

export default observer(ConfigureCard);
