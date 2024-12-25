import Section from "@/components/Section";
import CreateBlogButton from "@/components/ui/blog/create-blog-button";
import { HR } from "flowbite-react";
import { Suspense } from "react";

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
    </Section>
  )
}