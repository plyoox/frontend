import { AxiosError } from "axios";
import { IconAlertTriangle } from "@tabler/icons-react";

interface Props {
  error: AxiosError;
}

function RequestError({ error }: Props) {
  return (
    <div className={"mt-2 rounded-md bg-red-300 p-5 text-red-950"}>
      <div className={"mb-2 flex gap-2"}>
        <IconAlertTriangle size={24} />
        <span>{error.message}</span>
      </div>

      <span className={"text-sm text-black"}>If this error persists, please contact support.</span>
    </div>
  );
}

export default RequestError;
