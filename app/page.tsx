import Pagination from '@/components/Pagination'
import Image from 'next/image'

export default function Home() {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={1}/>
  )
}
