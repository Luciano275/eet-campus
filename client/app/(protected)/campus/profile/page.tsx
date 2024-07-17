import { auth } from "@/auth";
import CampusHeader from "@/components/ui/campus/Header";
import Left from "@/components/ui/campus/profile/left";
import Section from "@/components/ui/campus/Section";
import { getUserByEmail } from "@/lib/user";

export default async function ProfilePage(){

    const session = await auth()

    const user = await getUserByEmail(session?.user.email!);

    return (
      <Section>
        <CampusHeader title="Tu perfil" />
        <div className="flex pt-8 pb-4 gap-4 justify-between flex-wrap">
          <Left user={user} rol={session?.user.rol!} />
        </div>
      </Section>
    );
}