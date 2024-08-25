export default function UserAvatar(
  {url}
  : {
    url: string;
  }
) {
  return (
    <div className="avatar">
      <div className="w-10 lg:w-12 rounded-full overflow-hidden">
        <img src={url} alt="User" />
      </div>
    </div>
  )
}