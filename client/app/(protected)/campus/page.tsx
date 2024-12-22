import { auth } from "@/auth"
import CalendarComponent from "@/components/ui/campus/calendar/Calendar";
import CampusHeader from "@/components/ui/campus/Header";
import { fetchMyEvents } from "@/lib/events";
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();

    return {
        title: session?.user?.name!
    }
}

export default async function CampusPage() {

    const session = await auth();
    const userId = session?.user?.id!;

    const events = await fetchMyEvents({ userId })

    return (
        <>
            <CampusHeader title="Campus virtual" />
            <CalendarComponent events={events} />
        </>
    )
}