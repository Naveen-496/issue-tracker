import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesAction = () => {
  return (
    <div className="mb-5">
        <Button className="mb-4">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
  )
}

export default IssuesAction