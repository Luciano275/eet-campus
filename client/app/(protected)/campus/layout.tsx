import AlertProvider from "@/components/providers/alert-provider";
import { EditModeProvider } from "@/components/providers/edit-mode-provider";
import OpenNotifyProvider from "@/components/providers/open-notify-provider";
import { ToggleMenuProvider } from "@/components/providers/toggle-menu-provider";
import MenuBar from "@/components/ui/campus/Menubar";
import Notify from "@/components/ui/campus/Notify";
import Section from "@/components/ui/campus/Section";
import { getAllCoursesName } from "@/lib/course";

export default async function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courses = await getAllCoursesName();

  return (
    <AlertProvider>
      <ToggleMenuProvider>
        <OpenNotifyProvider>
          <EditModeProvider>
            <main className="flex relative overflow-hidden min-h-screen max-h-screen">
              <MenuBar />
              <Section className="relative">{children}</Section>
              <Notify />
            </main>
          </EditModeProvider>
        </OpenNotifyProvider>
      </ToggleMenuProvider>
    </AlertProvider>
  );
}
