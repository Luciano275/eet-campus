import { Suspense } from "react";
import CreateBlogButton from "./button";

const auth = async (headers: Headers) => {
  try {
    const rq = await fetch(`${import.meta.env.FRONT_URL}/api/auth/session`, {
      credentials: 'include',
      headers
    })

    return await rq.json()
  }catch (e) {
    return null;
  }
}

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