import Section from "@/components/Section";
import BlogInfoSkeleton from "@/components/skeletons/blog-info-skeleton";
import Blog from "@/components/ui/blog/Blog";
import { findBlog } from "@/lib/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (
  {params}
  : {
    params: Promise<{
      id: string;
    }>
  }
): Promise<Metadata> => {
  const id = (await params).id || null;

  if (!id) {
    return {
      title: 'Blog no encontrado',
    }
  }

  const blog = await findBlog(id);

  if (!blog) {
    return {
      title: 'Blog no encontrado',
    }
  }

  return {
    title: blog.title,
    description: blog.description,
  }
}

export default async function SeeBlogPage(
  { params }
  : {
    params: Promise<{
      id: string;
    }>
  }
) {

  const id = (await params).id || null;

  if (!id) notFound();

  return (
    <Section>
      <Suspense fallback={<BlogInfoSkeleton />}>
        <Blog id={id} />
      </Suspense>
    </Section>
  )
}