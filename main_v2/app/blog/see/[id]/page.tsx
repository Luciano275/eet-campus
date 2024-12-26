import Section from "@/components/Section";
import BlogInfoSkeleton from "@/components/skeletons/blog-info-skeleton";
import Blog from "@/components/ui/blog/Blog";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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