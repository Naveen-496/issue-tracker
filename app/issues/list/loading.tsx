import { Table } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssuesAction from './IssuesAction';

const IssueLoadingPage = () => {

  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssuesAction />
    <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map((issue) => (
        <Table.Row key={issue}>
          <Table.Cell>
             <Skeleton />
            <p className="block md:hidden font-semibold text-[12px]">
           
            </p>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
          <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
  </div>
  )
}

export default IssueLoadingPage