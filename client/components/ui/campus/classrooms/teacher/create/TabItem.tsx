'use client'

import { Tabs } from 'flowbite-react';

export default function TabItem(
  {children, active}
  : {
    children: React.ReactNode;
    title: string;
    active?: boolean
  }
) {
  return (
    <Tabs.Item active={active} title={children}>
      {children}
    </Tabs.Item>
  )
}