'use client'

import { Accordion } from "flowbite-react";
import NewMessageForm from "./messages/new/Form";
import Image from "next/image";

export default function AddMessageButton({
  classroomId,
  image,
  apiUrl,
  userId,
  notificationUrl,
  rol
}: {
  classroomId: string;
  userId: string;
  apiUrl: string;
  image: string;
  notificationUrl: string;
  rol: number;
}) {
  return (
    <header className="py-4">
      <Accordion collapseAll className="dark:bg-base-300 dark:border-base-300">
        <Accordion.Panel>
          <Accordion.Title>
            <span className="flex gap-2 items-center">
              <div className="avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <Image src={image} alt="User Image" width={40} height={40} />
                </div>
              </div>
              <span className="text-base-content group-hover:text-blue-500">
                Agregar un mensaje
              </span>
            </span>
          </Accordion.Title>

          <Accordion.Content>
            <NewMessageForm
              apiUrl={apiUrl}
              notificationUrl={notificationUrl}
              userId={userId}
              classroomId={classroomId}
              rol={rol}
            />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </header>
  );
}
