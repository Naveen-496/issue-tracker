import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
       <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton params={{ id: issue.id }} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
