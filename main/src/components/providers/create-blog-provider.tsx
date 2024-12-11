import React, { createContext, useState, useContext } from 'react'

interface ICreateBlogContext {
  content: string;
  setContent: (content: string) => void;
}

const CreateBlogContext = createContext<ICreateBlogContext>({
  content: '',
  setContent: () => {},
})

export const useCreateBlogContext = () => useContext(CreateBlogContext)

export default function CreateBlogProvider({ children }: { children: React.ReactNode }) {
  const [ content, setContent ] = useState('');

  return (
    <CreateBlogContext.Provider value={{ content, setContent }}>
      {children}
    </CreateBlogContext.Provider>
  )
}