import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
    {
      label: "InProgress Issues",
      value: inProgress,
      status: "INPROGRESS",
    },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label } style={{ border: "1px solid green"}} variant="classic">
          <Flex direction="column" gap="2">
            <Link 
            className="text-sm font-medium hover:text-gray-600"
            href={`issues/list?status=${container.status}`}>{container.label}</Link>
          </Flex>
          <Text size="4" className="font-bold">{container.value}</Text>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
