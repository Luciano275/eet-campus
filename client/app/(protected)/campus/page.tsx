import { auth } from "@/auth"
import CalendarComponent from "@/components/ui/campus/Calendar";
import { OpenNotifyButton } from "@/components/ui/campus/notify-buttons";
import ThemeButton from "@/components/ui/public/theme-button";
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();

    return {
        title: session?.user?.name!
    }
}

export default async function CampusPage() {
    return (
        <section className="min-h-screen relative overflow-x-hidden overflow-y-auto grow p-4">
            <header className={`w-full flex justify-between items-center pb-2 border-b border-base-300`}>
                <h1 className="text-3xl">Campus virtual</h1>
                <div className="flex items-center">
                    <OpenNotifyButton />
                    <ThemeButton whiteColor />
                </div>
            </header>

            <CalendarComponent />
        </section>
    )
}