import Image from 'next/image'
import { FaArrowCircleDown } from "react-icons/fa";
import shadowStyles from '@/styles/shadow.module.css'
import arrowStyles from "@/styles/arrow.module.css"
import Link from 'next/link';

export default function InitialText() {
    return (
      <div className="relative min-h-screen flex justify-center items-center py-4 px-7 flex-col gap-y-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className='w-full max-w-[400px] flex justify-center mx-auto px-8'>
            <Image
              src={"/logo.jpg"}
              alt={"Logo"}
              width={200}
              height={200}
              priority
              className='animate-pulsing'
            />
          </div>
          <h2 className={`text-white text-4xl font-bold text-center`}>
            Daniel Óscar Reyes
          </h2>
        </div>
        <Link
          href={"/register"}
          className="btn border-info bg-transparent text-info hover:bg-info hover:text-white hover:border-info"
        >
          Empezar ya
        </Link>
        <div className="absolute bottom-0 py-5" id={arrowStyles.arrowDown}>
          <a
            href="#campus"
            className="block text-info w-fit rounded-full border border-info overflow-hidden hover:text-primary"
            id={shadowStyles.shadowButton}
          >
            <FaArrowCircleDown size={40} />
          </a>
        </div>
      </div>
    );
}