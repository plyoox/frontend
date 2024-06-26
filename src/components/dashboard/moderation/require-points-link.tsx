import type { ModerationConfig } from "@/types/moderation";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconAlertTriangle, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

function RequirePointsLink({
  link,
  label,
  config,
  description,
}: {
  link: string;
  label: string;
  config: ModerationConfig;
  description?: string;
}) {
  return (
    <Link
      className="my-2.5 flex min-h-[4rem] w-full items-center justify-between rounded-md bg-mt-dark-6 px-4 py-2 duration-300 hover:bg-mt-dark-5"
      href={link}
    >
      <div>
        <span className={"text-xl font-semibold text-pl-text"}>{label}</span>
        {description && <span className={"block text-sm text-mt-dark-1"}>{description}</span>}
      </div>

      <div className={"flex"}>
        {config.point_actions.length === 0 && (
          <Tooltip label="No point action handlers configured.">
            <ActionIcon color={"yellow"} variant={"light"}>
              <IconAlertTriangle />
            </ActionIcon>
          </Tooltip>
        )}

        <IconChevronRight />
      </div>
    </Link>
  );
}

export default RequirePointsLink;
