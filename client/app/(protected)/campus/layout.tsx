import { auth } from "@/auth";
import AlertProvider from "@/components/providers/alert-provider";
import ClassroomQueryProvider from "@/components/providers/classroom-query-provider";
import ClassroomSocketProvider from "@/components/providers/classroom-socket-provider";
import { EditModeProvider } from "@/components/providers/edit-mode-provider";
import OpenNotifyProvider from "@/components/providers/open-notify-provider";
import { ToggleMenuProvider } from "@/components/providers/toggle-menu-provider";
import MenuBar from "@/components/ui/campus/Menubar";
import Notify from "@/components/ui/campus/Notify";
import Section from "@/components/ui/campus/Section";

export default async function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user.id!;

  return (
    <ClassroomQueryProvider>
      <ClassroomSocketProvider socketUrl={process.env.CLASSROOM_SOCKET_URL!}>
        <ClassroomSocketProvider socketUrl={process.env.CLASSROOM_SOCKET_NOTIFICATIONS_URL!}>
          <AlertProvider>
            <ToggleMenuProvider>
              <OpenNotifyProvider>
                <EditModeProvider>
                  <main className="flex relative overflow-hidden min-h-screen max-h-screen">
                    <MenuBar />
                    <Section className="relative">{children}</Section>
                    <Notify
                      apiUrl={`${process.env.CLASSROOM_SOCKET_NOTIFICATIONS_URL}/api/notifications`}
                      userId={userId}
                    />
                  </main>
                </EditModeProvider>
              </OpenNotifyProvider>
            </ToggleMenuProvider>
          </AlertProvider>
        </ClassroomSocketProvider>
      </ClassroomSocketProvider>
    </ClassroomQueryProvider>
  );
}
