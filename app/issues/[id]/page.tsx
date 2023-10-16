import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
    <Grid columns={{ initial: "1", md: "2"}} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="5" my="2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.issuedAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt="5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
