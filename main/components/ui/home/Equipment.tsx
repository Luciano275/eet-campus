import Article from "@/components/Article";
import { members } from "@/lib/utils";
import { HR } from "flowbite-react";
import Image from "next/image";

export default function Equipment () {
  return (
    <Article id='equipment' className='flex flex-col gap-6'>
      <h2 className="text-3xl md:text-4xl font-bold text-center">Equipo directivo</h2>
      <HR />
      <div className="flex flex-wrap justify-center items-center gap-4">
        { members.map((member, index) => (
          <div key={`member:${index}:${member.alt}`} className="overflow-hidden rounded-xl flex flex-col gap-4 border border-base-300 bg-base-100 dark:bg-base-300 dark:hover:bg-base-100 transition-all hover:bg-base-200 hover:scale-105">
            <a href={member.link}>
              <Image
                src={member.img}
                alt={member.alt}
                className={"w-full max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] md:min-h-[400px] md:max-h-[400px] object-cover object-top aspect-video"}
                width={300}
                height={400}
              />
            </a>
            <div className="px-4 pb-4">
              <h2 className="text-2xl font-bold text-base-content">{member.fullname}</h2>
              <h3 className="text-xl">{member.alt}</h3>
            </div>
          </div>
        )) }
      </div>
    </Article>
  )
}