import { fetchClassroomDescription } from "@/lib/classroom/description";
import DescriptionPreview from "./teacher/create/Preview";

export default async function ClassroomDescription(
  {filename}
  : {
    filename: string;
  }
) {

  const url = await fetchClassroomDescription(filename);
  const rq = await fetch(url);

  if (!rq.ok) {
    return <p>Algo salio mal</p>
  }

  const content = await rq.text();

  return (
    <DescriptionPreview customContent={content} />
  )
}