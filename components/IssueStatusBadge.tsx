import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, { label: string, color: "orange" | "green" | "blue"}> = { 
  OPEN: { label: "Open", color: "orange"},
  CLOSED: { label: "Closed", color: "green"},
  INPROGRESS: { label: "InProgress", color: "blue"}
}

const IssueStatusBadge = ({ status}: { status: Status}) => {
  return (
     <Badge color={statusMap[status].color}>
           { statusMap[status].label}
     </Badge>
  )
}

export default IssueStatusBadge