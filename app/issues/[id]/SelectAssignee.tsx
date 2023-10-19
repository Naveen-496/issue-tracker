"use client";
import { Select } from '@radix-ui/themes'
import React from 'react'

const SelectAssignee = () => {
  return (
    
     <Select.Root>
       <Select.Trigger placeholder='Assignee...'/>
       <Select.Content>
         <Select.Group>
           <Select.Label>Suggestions</Select.Label>
           <Select.Item value='1' className='cursor-pointer'>
              Naveen Reddy
           </Select.Item>
           <Select.Item value='2'>
             John Meda
           </Select.Item>
           <Select.Item value='3'>
              Ravi Josh
           </Select.Item>
         </Select.Group>
       </Select.Content>
     </Select.Root>
  )
}

export default SelectAssignee