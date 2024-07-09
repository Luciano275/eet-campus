import MenuBar from "@/components/ui/campus/Menubar"

export default function CampusLayout(
    {children}
    : {
        children: React.ReactNode
    }
) {
    return (
        <main className="flex overflow-hidden min-h-screen max-h-screen">
            <MenuBar />
            {children}
        </main>
    )
}