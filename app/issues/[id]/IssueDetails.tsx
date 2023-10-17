import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue}) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
        <Flex gap="5" my="2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.issuedAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt="5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetails