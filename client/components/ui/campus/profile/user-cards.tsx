'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { getRol } from "@/lib/utils"
import { UserInfo } from "@/types"
import { Left, Right } from "./user-info"

export default function UserCards(
  {user, rol}
  : {
    user: UserInfo
    rol: number;
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
      />
      
    </>
  )
}