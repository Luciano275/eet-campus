import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Aulas - E.E.T 3117',
    template: '%s - E.E.T 3117'
  }
}

export default function ClassroomsPage() {
  return (
    <>
      <CampusHeader title="Aulas" />
    </>
  )
}