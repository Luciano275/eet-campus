import Section from "@/components/Section";
import Blogs from "@/components/ui/blog/Blogs";
import CreateBlogButton from "@/components/ui/blog/create-blog-button";
import { HR } from "flowbite-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Nuestros Blogs'
}

export default function BlogPage() {
  return (
    <Section className="flex flex-col gap-4">
      <header>
        <h1 className="text-4xl font-bold dark:text-white">Nuestras últimas noticias</h1>
        <HR />
      </header>

      <Suspense>
        <CreateBlogButton />
      </Suspense>

      <Suspense fallback={<div>Cargando...</div>}>
        <Blogs />
      </Suspense>
    </Section>
  )
}