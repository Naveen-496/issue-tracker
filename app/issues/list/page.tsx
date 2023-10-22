import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssuesAction from "./IssuesAction";
import IssuesTable from "./IssuesTable";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    classnName?: string;
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", classnName: "hidden md:table-cell" },
    { label: "Created", value: "issuedAt", classnName: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };  

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div className="">
      <IssuesAction />
      <IssuesTable
        issues={issues}
        columns={columns}
        searchParams={searchParams}
      />
      <Pagination
        itemCount={ issueCount }
        pageSize={pageSize}
        currentPage={ page }
      />
    </div>
  );
};

// export const dynamic = "force-dynamic";
export const revalidate = 60;

export default IssuesPage;
