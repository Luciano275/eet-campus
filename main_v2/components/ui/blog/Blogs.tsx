import { findAllBlogs } from "@/lib/blogs"
import { auth } from "@/lib/user";
import { format } from 'date-fns'
import { es } from "date-fns/locale";
import { Link } from "next-view-transitions";

export default async function Blogs() {

  const blogs = await findAllBlogs();
  const { success, ...rest } = await auth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
          <article key={`blog:${blog.id}`} className="transition-colors min-h-[450px] max-h-[450px] border border-base-300 p-4 rounded-xl bg-base-100 hover:bg-base-200 flex flex-col gap-4 dark:bg-base-300 dark:hover:bg-gray-950">
            <div className="flex justify-between flex-wrap-reverse items-center">
              <p className="text-sm opacity-60">{format(new Date(blog.createdAt), "dd 'de' MMMM 'del' yyyy", { locale: es })}</p>
              
              {/* { (session && (session.user.rol === 1 || session.user.rol === 2)) && <DeleteBlogButton blogId={blog.id} /> } */}
            </div>
            <h2 className="text-2xl font-semibold pb-4 border-b">{blog.title}</h2>
            <p className="text-justify grow overflow-auto">
              {blog.description}
            </p>
            <Link href={`/blog/see/${blog.id}`} className="bg-blue-500 text-center py-2 px-4 rounded-lg text-white hover:bg-blue-600">Leer más</Link>
          </article>
        )
      )}
    </div>
  )
}