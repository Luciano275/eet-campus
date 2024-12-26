import { auth } from "@/lib/user"
import { Alert, HR } from "flowbite-react";
import { Link } from "next-view-transitions";
import { CgAdd } from "react-icons/cg";
import { HiInformationCircle } from "react-icons/hi";

export default async function CreateBlogButton() {

  const rq = await auth();

  if (!rq.success) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        { rq.error }
      </Alert>
    )
  }

  if (rq.session && (rq.session.user.rol === 1 || rq.session.user.rol === 2)) {
    return (
      <>
        <Link
          href={'/blog/create'}
          className="w-full max-w-fit bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 flex gap-2 items-center"
        >
          <CgAdd size={20} />
          <span>Crear un nuevo blog</span>
        </Link>
  
        <HR />
      </>
    )
  }
}