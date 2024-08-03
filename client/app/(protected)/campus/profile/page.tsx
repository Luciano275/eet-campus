import { auth } from "@/auth";
import CampusHeader from "@/components/ui/campus/Header";
import Section from "@/components/ui/campus/Section";
import { getUserByEmail } from "@/lib/user";
import UserCards from "@/components/ui/campus/profile/user-cards";
import ProfileStyles from "@/styles/profile.module.css";
import { EditFormProvider } from "@/components/providers/edit-form-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mí perfil'
}

export default async function ProfilePage() {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email!);

  return (
    <EditFormProvider>
      <Section>
        <CampusHeader title="Tu perfil" />
        <div
          className={`flex pt-5 md:pt-10 pb-4 md:px-10 gap-x-10 gap-y-5 flex-wrap ${ProfileStyles["profile-container"]}`}
        >
          <UserCards
            userSession={session?.user!}
            user={user}
            rol={session?.user.rol! - 1}
          />
        </div>
      </Section>
    </EditFormProvider>
  );
}
