import LoadingComponent from "@/components/Loading"
import AlertProvider from "@/components/providers/alert-provider"
import { EditModeProvider } from "@/components/providers/edit-mode-provider"
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
        <AlertProvider>
            <ToggleMenuProvider>
                <OpenNotifyProvider>
                    <EditModeProvider>
                        <main className="flex relative overflow-hidden min-h-screen max-h-screen">
                            <LoadingComponent />
                            <MenuBar />
                            {children}
                            <Notify />
                        </main>
                    </EditModeProvider>
                </OpenNotifyProvider>
            </ToggleMenuProvider>
        </AlertProvider>
    )
}