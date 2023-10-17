import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props { 
  params: { id: number}
}

const EditIssueButton = ({params: { id }}: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton