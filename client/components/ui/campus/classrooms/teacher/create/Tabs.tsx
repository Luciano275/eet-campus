'use client';

import { Tabs } from 'flowbite-react'

export default function CreateClassroomTabs(
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <Tabs aria-label="Tabs with underline" variant="underline" className='mt-4 border-none'>
      {children}
    </Tabs>
  )
}