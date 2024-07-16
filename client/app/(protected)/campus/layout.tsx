import OpenNotifyProvider from "@/components/providers/open-notify-provider"
import MenuBar from "@/components/ui/campus/Menubar"
import Notify from "@/components/ui/campus/Notify"

export default function CampusLayout(
    {children}
    : {
        children: React.ReactNode
    }
) {
    return (
        <OpenNotifyProvider>
            <main className="flex relative overflow-hidden min-h-screen max-h-screen">
                <MenuBar />
                {children}
                <Notify />
            </main>
        </OpenNotifyProvider>
    )
}