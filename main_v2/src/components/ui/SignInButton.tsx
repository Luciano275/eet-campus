export default function SignInButton(
  { onlyMobile, campusUrl }
  : {
    onlyMobile?: boolean;
    campusUrl: string;
  }
) {
  return (
    <a
      href={campusUrl}
      className={`btn btn-primary text-white ${onlyMobile ? 'flex md:hidden' : 'hidden md:inline-flex'}`}>Acceder</a
    >
  )
}