import Pagination from "@/components/Pagination";
import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./api/IssueSummary";
import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "INPROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <Flex gap="4">
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      {/* <LatestIssues /> */}
    </Flex>
  );
}
