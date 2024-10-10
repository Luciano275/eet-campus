import OpenNotifyProvider from "@/components/providers/open-notify-provider";
import MenuBar from "../campus/Menubar";
import Notify from "../campus/Notify";
import Section from "../campus/Section";
import CampusHeader from "../campus/Header";
import { auth } from "@/auth";
import ClassroomQueryProvider from "@/components/providers/classroom-query-provider";

export default async function AuthenticatedPage() {

    const session = await auth();
    const userId = session?.user.id!;

    return (
        <ClassroomQueryProvider>
            <OpenNotifyProvider>
                <main className="flex relative overflow-hidden min-h-screen max-h-screen">
                    <MenuBar />
                    <Section className="flex flex-col">
                        <CampusHeader title="Página no encontrada" />
                        <div className="grow flex justify-center items-center">
                            <img
                                src="/assets/notfound.svg"
                                alt="Not Found Logo"
                                className="w-full max-w-[500px]"
                            />
                        </div>
                    </Section>
                    <Notify 
                        apiUrl={`${process.env.CLASSROOM_SOCKET_URL}/api/notifications`}
                        userId={userId}
                    />
                </main>
            </OpenNotifyProvider>
        </ClassroomQueryProvider>
    )
}