export const auth = async (
  {headers, campusUrl}
  : {
    headers: Headers;
    campusUrl: string;
  }
) => {
  try {
    const rq = await fetch(`${campusUrl}/api/auth/session`, {
      method: 'GET',
      credentials: 'include',
      mode: 'no-cors',
      headers
    })

    return await rq.json()
  }catch (e) {
    return null;
  }
}