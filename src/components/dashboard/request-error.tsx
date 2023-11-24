import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface Props {
  errors: [any, any];
}

function RequestError({ errors: [er1, er2] }: Props) {
  return (
    <Alert color="red" icon={<IconAlertTriangle />} mb={10} mt={10} variant="filled">
      {(er1 || er2).message}
    </Alert>
  );
}

export default RequestError;
