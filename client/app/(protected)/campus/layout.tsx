import LoadingComponent from "@/components/Loading"
import OpenNotifyProvider from "@/components/providers/open-notify-provider"
import { ToggleMenuProvider } from "@/components/providers/toggle-menu-provider"
import MenuBar from "@/components/ui/campus/Menubar"
import Notify from "@/components/ui/campus/Notify"

export default function CampusLayout(
    {children}
    : {
        children: React.ReactNode
    }
) {
    return (
        <ToggleMenuProvider>
            <OpenNotifyProvider>
                <main className="flex relative overflow-hidden min-h-screen max-h-screen">
                    <LoadingComponent />
                    <MenuBar />
                    {children}
                    <Notify />
                </main>
            </OpenNotifyProvider>
        </ToggleMenuProvider>
    )
}