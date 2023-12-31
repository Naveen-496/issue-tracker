import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { Toaster, toast } from "sonner";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import SelectAssignee from "./SelectAssignee";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  // await delay(1000);

  return (
    <>
      <Toaster />
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex gap="5" direction="column">
              <SelectAssignee issue={issue} />
              <EditIssueButton params={{ id: issue.id }} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of the issue " + issue?.id,
  };
}

export default IssueDetailPage;
