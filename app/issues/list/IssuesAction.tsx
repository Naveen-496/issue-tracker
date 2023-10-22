import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssuesAction = () => {
  return (
    <Flex justify="between">
       <IssueStatusFilter />
        <Button className="mb-4">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
  )
}

export default IssuesAction