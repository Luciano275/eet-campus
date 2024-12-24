'use client'

import { findAllBlogs } from '@lib/blogs'
import { Suspense } from 'react';
import RenderBlogs from './render-blogs';
import { auth } from '@lib/user';

export default function Blogs(
  { campusUrl, headers }
  : {
    campusUrl: string;
    headers: Headers;
  }
) {

  const authPromise = auth({ campusUrl, headers });
  const findBlogsPromise = findAllBlogs();

  return (
    <Suspense fallback={<p>Skeleton</p>}>
      <RenderBlogs findBlogsPromise={findBlogsPromise} authPromise={authPromise} />
    </Suspense>
  )
}