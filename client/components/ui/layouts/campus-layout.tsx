import React from "react"
import MenuBar from "../campus/Menubar"

export default function CampusLayout(
    {children}
    : {
        children: React.ReactNode
    }
) {
    return (
        <main className="min-h-screen max-h-screen flex overflow-hidden">
            <MenuBar />
            {children}
        </main>
    )
}