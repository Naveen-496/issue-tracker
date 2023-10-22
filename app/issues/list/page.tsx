import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssuesAction from "./IssuesAction";
import IssuesTable, { IssueQuery, columnNames } from "./IssuesTable";
import Pagination from "@/components/Pagination";
import { Flex } from "@radix-ui/themes";

export interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  //  await delay(2000);
  return (
    <Flex direction="column" gap="4">
      <IssuesAction />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

// export const dynamic = "force-dynamic";
export const revalidate = 60;

export default IssuesPage;
