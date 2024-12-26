'use client';

import { use, createContext, useState } from 'react';

interface IBlogContext {
  content: string;
  setContent: (content: string) => void;
}

const BlogContext = createContext<IBlogContext>({
  content: '',
  setContent: () => {},
});

export const useBlog = () => use(BlogContext);

export default function BlogProvider(
  {children}
  : {
    children: React.ReactNode
  }
) {
  const [ content, setContent ] = useState('');

  return (
    <BlogContext.Provider value={{ content, setContent }}>
      {children}
    </BlogContext.Provider>
  )
}