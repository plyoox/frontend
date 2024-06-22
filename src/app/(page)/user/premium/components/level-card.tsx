import type { AuthUser } from "@/types/authentication";
import { clsx } from "clsx";
import { Poppins } from "next/font/google";

const font = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

function LevelCard({
  xp = 50,
  gradient,
  avatarUrl,
  user,
}: {
  xp?: number;
  gradient?: { from?: string; to?: string };
  avatarUrl: string;
  user: AuthUser;
}) {
  const width = 250 * Math.min(xp / 100, 1);

  let progressColor = "#24c689";

  if (gradient?.from) {
    if (gradient.from && !gradient.to) progressColor = gradient.from;
    else progressColor = `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`;
  }

  return (
    <div
      className={clsx(font.className, "select-none")}
      style={{
        width: "500px",
        height: "170px",
      }}
    >
      <div
        className={font.className}
        style={{
          backgroundColor: "#18181b",
          borderRadius: "3px",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <img
          alt="Nothing found"
          height={128}
          src={avatarUrl}
          style={{ borderRadius: "50%", marginLeft: "25px", marginRight: "25px" }}
          width={128}
        />

        <div className={"mb-4 mt-auto flex flex-col"}>
          <div style={{ display: "flex", alignItems: "flex-end", height: "0%" }}>
            <span style={{ fontSize: "22px" }}>{user.username}</span>
          </div>

          <div className={"relative flex"}>
            <div
              style={{
                width: "250px",
                height: "20px",
                backgroundColor: "#3f3f46",
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "250px",
                height: "100%",
                borderRadius: "10px",
                background: progressColor,
                clipPath: `inset(0 ${250 - width}px 0 0)`,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "250px",
              justifyContent: "space-between",
              marginTop: "5px",
              fontSize: "17px",
            }}
          >
            <div className={"flex flex-col"}>
              <span>Level</span>
              <span className={"relative -top-1"} style={{ color: "hsl(0, 0%, 70%)" }}>
                1
              </span>
            </div>
            <div className={"flex flex-col"}>
              <span>XP</span>
              <span className={"relative -top-1"} style={{ color: "hsl(0, 0%, 70%)" }}>
                {xp}/100
              </span>
            </div>
            <div className={"flex flex-col"}>
              <div>Rank</div>
              <div className={"relative -top-1"} style={{ color: "hsl(0, 0%, 70%)" }}>
                #1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelCard;
