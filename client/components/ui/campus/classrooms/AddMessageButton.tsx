import Link from "next/link";
import NewMessageForm from "./messages/new/Form";

export default function AddMessageButton({
  classroomId,
  image,
  apiUrl,
  userId,
  bucketURL
}: {
  classroomId: string;
  userId: string;
  apiUrl: string;
  image: string;
  bucketURL: string;
}) {
  return (
    <header className="py-4 border-b border-base-content">
      <div className="collapse">
        <input type="checkbox" />
        <h2
          className="flex gap-2 items-center collapse-title"
        >
          <div className="avatar">
            <div className="w-10 rounded-full overflow-hidden">
              <img src={image} alt="User Image" />
            </div>
          </div>
          <span className="text-base-content group-hover:text-blue-500">
            Agregar un mensaje
          </span>
        </h2>
        <div className="collapse-content">
          <NewMessageForm
            apiUrl={apiUrl}
            userId={userId}
            classroomId={classroomId}
            bucketURL={bucketURL}
          />
        </div>
      </div>
    </header>
  );
}
