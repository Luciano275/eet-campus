'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { getRol } from "@/lib/utils"
import { UserInfo } from "@/types"
import { Left, Right } from "./user-info"
import { Session } from "next-auth"

export default function UserCards(
  {user, rol, userSession}
  : {
    user: UserInfo
    rol: number;
    userSession: Session['user']
  }
) {

  const { theme } = useChangeThemeContext();

  const rolName = getRol(rol)

  return (
    <>
      
      <Left
        rolName={rolName}
        theme={theme}
        user={user}
      />

      <Right
        rolName={rolName}
        user={user}
        theme={theme}
        userSession={userSession}
      />
      
    </>
  )
}