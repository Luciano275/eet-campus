import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Aulas'
}

export default function ClassroomsPage() {
  return (
    <>
      <CampusHeader title="Aulas" />
    </>
  )
}