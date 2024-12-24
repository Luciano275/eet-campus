'use client'

import { Suspense } from "react";
import CreateBlogButton from "./create-blog-button";
import { auth } from "@lib/user";

export default function CreateBlog(
  {headers, campusUrl}
  : {
    headers: Headers;
    campusUrl: string;
  }
) {

  const authPromise = auth({
    headers,
    campusUrl
  });
  
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CreateBlogButton authPromise={authPromise} />
    </Suspense>
  )
}