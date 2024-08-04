import Image from "next/image";
import ThemeButton from "./theme-button";

export default function Header () {
    return (
        <header className="flex flex-col justify-center py-5 px-2">
            <div className="flex justify-end">
                <ThemeButton whiteColor />
            </div>
            <Image
                src={'/logo.png'}
                alt="Logo"
                width={150}
                height={150}
                priority
                className="mx-auto"
            />
        </header>
    )
}