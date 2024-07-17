import { auth } from "@/auth"
import CalendarComponent from "@/components/ui/campus/Calendar";
import CampusHeader from "@/components/ui/campus/Header";
import Section from "@/components/ui/campus/Section";
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();

    return {
        title: session?.user?.name!
    }
}

export default async function CampusPage() {
    return (
        <Section className="relative">
            <CampusHeader title="Campus virtual" />
            <CalendarComponent />
        </Section>
    )
}