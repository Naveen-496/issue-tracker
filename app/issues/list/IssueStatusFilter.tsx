"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; status?: Status }[] = [
  { label: "All" },
  { label: "Open", status: "OPEN" },
  { label: "Closed", status: "CLOSED" },
  { label: "In Progress", status: "INPROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
     defaultValue={ searchParams.get("status") || ""}
      onValueChange={(status) => {
        status = status === "all" ? "" : status;
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by..."></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.status || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
