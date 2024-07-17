import ThemeButton from "../public/theme-button"
import { OpenNotifyButton } from "./notify-buttons"

export default function CampusHeader (
    { title }
    : {
        title: string
    }
) {
    return (
        <header className={`w-full flex justify-between items-center pb-2 border-b border-base-300`}>
            <h1 className="text-3xl">{title}</h1>
            <div className="flex items-center">
                <OpenNotifyButton />
                <ThemeButton whiteColor />
            </div>
        </header>
    )
}