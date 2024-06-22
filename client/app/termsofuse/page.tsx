import { TermsOfUse, CookieAlert } from './policy'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function TermsOfUsePage() {

    const { terms } = TermsOfUse;

    return (
      <main className="min-h-screen w-full px-4 md:w-3/4 md:mx-auto pt-24 pb-8 animate-blurred-fade-in">
        <h2 className="text-3xl font-semibold py-4 border-b mb-4">
          Términos de uso
        </h2>
        <section className="flex flex-col gap-8 mb-8">
          {terms.map(({ title, content }, index) => (
            <article key={`${index}:${title}`} className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              {content.map((term, index) => (
                <Markdown
                  key={`${index}:${term.length}`}
                  remarkPlugins={[remarkGfm]}
                  className="[&>p>a]:text-blue-700 text-justify"
                >
                  {term}
                </Markdown>
              ))}
            </article>
          ))}
        </section>

        <h2 className='text-3xl font-semibold py-4 border-b' id="cookie-warning">Aviso de cookies</h2>

        <section>
            <article>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="[&>p>a]:text-blue-700 text-justify"
                >
                    {CookieAlert.content}
                </Markdown>
            </article>
        </section>
      </main>
    );
}