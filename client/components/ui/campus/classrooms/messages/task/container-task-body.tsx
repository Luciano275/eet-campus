'use client';

import { Tabs } from "flowbite-react";
import * as FaIcons from 'react-icons/fa'

interface IProps {
  items: {
    title: string;
    icon: keyof typeof import('react-icons/fa');
    content: React.ReactNode;
  }[]
}

export default function ContainerTaskBody (
  { items }
  : IProps
) {
  return (
    <Tabs
      aria-label="Tabs with underline"
      variant="underline"
    >
      { items.map((item, index) => (
        <Tabs.Item
          key={index}
          title={item.title}
          icon={FaIcons[item.icon]}
          active={index === 0}
        >
          {item.content}
        </Tabs.Item>
      )) }
    </Tabs>
  )
}