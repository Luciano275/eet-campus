import Image from "next/image";

export default function Wallpaper() {
    return (
        <div className="absolute -z-50 w-full h-full overflow-hidden">
            <Image
                src={'/wp.jpg'}
                alt={'Wallpaper'}
                width={1920}
                height={1080}
                priority
                className="w-full max-w-full h-auto object-cover"
                style={{
                    objectPosition: '0px -200px'
                }}
            />
            <div className="absolute top-0 left-0 w-full h-full -z-0 bg-black backdrop-blur-xl bg-opacity-70"></div>
        </div>
    )
}