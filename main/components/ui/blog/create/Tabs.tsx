'use client';

import { Tabs } from 'flowbite-react'
import BlogPreview from './Preview';
import { FaEye } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';

export default function CreateBlogTabs(
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <Tabs aria-label="Pills" variant="pills">
      <Tabs.Item title="Configuración" active icon={FaPencilAlt}>
        {children}
      </Tabs.Item>

      <Tabs.Item title="Vista previa" icon={FaEye}>
        <BlogPreview />
      </Tabs.Item>
    </Tabs>
  )
}