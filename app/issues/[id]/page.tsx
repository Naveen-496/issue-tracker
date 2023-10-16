import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";


interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  await delay(2000);

  return <div>
    <Heading>{issue.title}</Heading>
    <Flex gap="5" my="2">
     <IssueStatusBadge status={issue.status} />
    <p>{issue.issuedAt.toDateString()}</p>
    </Flex>
    <Card className="prose" mt="5">
       <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
   
  </div>;
};

export default IssueDetailPage;
