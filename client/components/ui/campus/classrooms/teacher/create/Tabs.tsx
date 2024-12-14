'use client';

import { Tabs } from 'flowbite-react'
import TabItem from './TabItem';
import DescriptionPreview from './Preview';

export default function CreateClassroomTabs(
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <Tabs aria-label="Tabs with underline" variant="underline" className='border-none'>
      <TabItem title="Configuración" active>
        {children}
      </TabItem>

      <TabItem title="Vista previa">
        <DescriptionPreview />
      </TabItem>
    </Tabs>
  )
}