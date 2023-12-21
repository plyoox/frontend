import { Badge, ThemeIcon } from "@mantine/core";
import { ILink } from "@/types/utils";
import { useParams } from "next/navigation";
import NextLink from "next/link";

export interface LinkProps extends ILink {
  setOpened: (value: boolean) => void;
}

function Link({ color, icon, label, link, setOpened, beta }: LinkProps) {
  const { "(id)": id } = useParams();

  return (
    <NextLink
      className="block rounded p-3 text-white hover:bg-white/5 hover:bg-opacity-20"
      href={`/dashboard/${id}/${link}`}
      onClick={() => {
        setOpened(false);
      }}
    >
      <div className={"flex items-center gap-2"}>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <span className="font-medium">{label}</span>

        {beta && (
          <Badge gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }} ml="auto" variant="gradient">
            Beta
          </Badge>
        )}
      </div>
    </NextLink>
  );
}

export default Link;
