export const auth = async (headers: Headers) => {
  try {
    const rq = await fetch(`${import.meta.env.FRONT_URL}/api/auth/session`, {
      credentials: 'include',
      headers
    })

    return await rq.json()
  }catch (e) {
    return null;
  }
}