import BlogProvider from "@/components/providers/blog-provider";
import Section from "@/components/Section";
import CreateBlogForm from "@/components/ui/blog/create/Form";
import CreateBlogTabs from "@/components/ui/blog/create/Tabs";
import { auth } from "@/lib/user";
import { notFound } from "next/navigation";

export default async function CreateBlogPage() {

  const authResult = await auth();

  if (!authResult.success) {
    throw new Error(authResult.error);
  }

  if (!authResult.session) {
    notFound();
  }

  return (
    <BlogProvider>
      <Section>
        <CreateBlogTabs>
          <CreateBlogForm />
        </CreateBlogTabs>
      </Section>
    </BlogProvider>
  )
}