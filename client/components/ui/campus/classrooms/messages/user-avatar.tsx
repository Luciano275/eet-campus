import Image from "next/image";

export default function UserAvatar(
  {url}
  : {
    url: string;
  }
) {
  return (
    <div className="avatar">
      <div className="w-10 lg:w-12 rounded-full overflow-hidden">
        <Image src={url} alt="User" width={48} height={48} />
      </div>
    </div>
  )
}