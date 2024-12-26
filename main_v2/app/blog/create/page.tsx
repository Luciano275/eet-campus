import BlogProvider from "@/components/providers/blog-provider";
import Section from "@/components/Section";
import CreateBlogForm from "@/components/ui/blog/create/Form";
import CreateBlogTabs from "@/components/ui/blog/create/Tabs";

export default function CreateBlogPage() {
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