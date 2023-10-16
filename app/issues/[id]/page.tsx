import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <div>
    <Heading>{issue.title}</Heading>
    <Flex gap="5" my="2">
     <IssueStatusBadge status={issue.status} />
    <p>{issue.issuedAt.toDateString()}</p>
    </Flex>
    <Card>
       <p>{issue.description}</p>
    </Card>
   
  </div>;
};

export default IssueDetailPage;
