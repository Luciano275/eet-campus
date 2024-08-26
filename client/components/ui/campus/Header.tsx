import Alert from "@/components/Alert"
import ThemeButton from "../public/theme-button"
import MenuBarButton from "./menubar-button"
import { OpenNotifyButton } from "./notify-buttons"
import { auth } from "@/auth"

export default async function CampusHeader (
    { title }
    : {
        title: string
    }
) {

    const session = await auth();
    const userId = session?.user.id!;

    return (
        <>
            <header className={`w-full flex justify-between items-center pb-2 border-b border-base-300`}>
                <h1 className="text-xl sm:text-3xl">{title}</h1>
                <div className="flex items-center">
                    <OpenNotifyButton
                        apiUrl={`${process.env.CLASSROOM_SOCKET_URL!}/api/notifications`}
                        userId={userId}
                    />
                    <ThemeButton whiteColor />
                    <MenuBarButton type="bar" />
                </div>
            </header>
            <Alert />
        </>
    )
}