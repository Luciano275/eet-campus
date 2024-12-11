import { Suspense } from "react";
import CreateBlogButton from "./button";
import { auth } from "@lib/user";

export default function CreateBlog(
  {headers}
  : {
    headers: Headers
  }
) {

  const authPromise = auth(headers);
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateBlogButton authPromise={authPromise} />
    </Suspense>
  )
}