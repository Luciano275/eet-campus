import Image from "next/image";

export default function UserAvatar(
  {url}
  : {
    url: string;
  }
) {
  return (
    <div className="avatar">
      <div className="w-10 lg:w-14 rounded-full overflow-hidden">
        <Image src={url} alt="User" width={48} height={48} className="object-contain" />
      </div>
    </div>
  )
}