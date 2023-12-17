import { AxiosError } from "axios";
import { IconAlertTriangle } from "@tabler/icons-react";

interface Props {
  error: AxiosError;
}

function RequestError({ error }: Props) {
  return (
    <div className={"bg-red-300 text-red-950 p-5 rounded-md mt-2"}>
      <div className={"flex gap-2 mb-2"}>
        <IconAlertTriangle size={24} />
        <span>{error.message}</span>
      </div>

      <span className={"text-sm text-black"}>If this error persists, please contact support.</span>
    </div>
  );
}

export default RequestError;
