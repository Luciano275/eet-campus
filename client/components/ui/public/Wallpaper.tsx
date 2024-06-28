import bgStyles from '@/styles/bg.module.css'

export default function Wallpaper() {
    return (
        <div className="absolute top-0 left-0 -z-50 w-full h-screen overflow-hidden" id={bgStyles.wallpaper}>
            <div className="absolute top-0 left-0 w-full h-full -z-0 bg-black backdrop-blur-xl bg-opacity-70"></div>
        </div>
    )
}