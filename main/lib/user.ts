import { Auth } from "@/types";
import { cookies } from "next/headers";

export const auth = async (): Promise<Auth> => {
  try {
    const cookiesStore = await cookies();

    const rq = await fetch(`${process.env.NEXT_PUBLIC_CAMPUS_URL}/api/auth/session`, {
      credentials: 'include',
      headers: {
        Cookie: cookiesStore.toString()
      }
    })

    if (!rq.ok) {
      return {
        success: false,
        error: 'No se pudo autenticar'
      }
    }

    return {
      success: true,
      session: await rq.json()
    }
  }catch (e) {
    console.error(e);
    return {
      success: false,
      error: 'Error en la petición'
    }
  }
}