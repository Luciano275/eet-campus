'use client'

import { useState, createContext, useContext } from 'react';

interface IClassroomDescriptionContext {
  content: string;
  setContent: (content: string) => void;
}

const ClassroomDescriptionContext = createContext<IClassroomDescriptionContext>({
  content: '',
  setContent: () => {},
});

export const useClassroomDescription = () => useContext(ClassroomDescriptionContext);

export default function ClassroomDescriptionProvider(
  {children}
  : {
    children: React.ReactNode
  }
) {
  const [content, setContent] = useState('');

  return (
    <ClassroomDescriptionContext.Provider value={{ content, setContent }}>
      {children}
    </ClassroomDescriptionContext.Provider>
  )
}