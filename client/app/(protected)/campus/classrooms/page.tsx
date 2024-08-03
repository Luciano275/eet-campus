import CampusHeader from "@/components/ui/campus/Header";
import Section from "@/components/ui/campus/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Aulas'
}

export default function ClassroomsPage() {
  return (
    <Section>
      <CampusHeader title="Aulas" />
    </Section>
  )
}