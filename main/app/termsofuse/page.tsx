import Markdown from "@/components/Markdown";
import Section from "@/components/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Términos De Uso Del Software'
}

const getTerms = async () => {
  try {
    const rq = await fetch(`${process.env.NEXT_PUBLIC_URL}/static_md/terms.md`);

    if (!rq.ok) {
      throw new Error('No se pudo obtener los términos de uso');
    }

    return await rq.text();
  }catch (e) {
    console.error(e);
    throw new Error('Fallo al obtener los términos de uso');
  }
}

export default async function TermsPage() {

  const content = await getTerms();

  return (
    <Section>
      <div className="prose max-w-none">
        <Markdown content={content} />
      </div>
    </Section>
  )
}