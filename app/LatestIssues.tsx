import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LatestIssues = async () => {
  // fetch the latest 5 issues
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      issuedAt: "desc",
    },
    take: 5,
    include: {
      assignerToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="1" align="start">
                    <Link className="hover:font-semibold transition-all" href={`issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignerToUser?.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
