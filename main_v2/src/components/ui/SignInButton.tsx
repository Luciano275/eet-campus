export default function SignInButton(
  { onlyMobile }
  : {
    onlyMobile?: boolean;
  }
) {
  return (
    <a
      href={import.meta.env.CAMPUS_PAGE}
      className={`btn btn-primary text-white ${onlyMobile ? 'flex md:hidden' : 'hidden md:inline-flex'}`}>Acceder</a
    >
  )
}