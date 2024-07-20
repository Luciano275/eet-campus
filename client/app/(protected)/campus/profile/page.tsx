import { auth } from "@/auth";
import CampusHeader from "@/components/ui/campus/Header";
import Section from "@/components/ui/campus/Section";
import { getUserByEmail } from "@/lib/user";
import UserInfo from "@/components/ui/campus/profile/user-info";
import UserCards from "@/components/ui/campus/profile/user-cards";

export default async function ProfilePage(){

    const session = await auth()

    const user = await getUserByEmail(session?.user.email!);

    return (
      <Section>
        <CampusHeader title="Tu perfil" />
        <div className="flex pt-10 pb-4 md:px-10 gap-10 flex-wrap">
          {/* <UserInfo user={user} rol={session?.user.rol!-1} /> */}
          <UserCards user={user} rol={session?.user.rol!-1} />
        </div>
      </Section>
    );
}