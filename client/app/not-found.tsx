import { auth } from "@/auth"
import AuthenticatedPage from "@/components/ui/notfound/authenticated"

export default async function NotFoundPage() {

    const session = !!(await auth())

    if (session) {
        return <AuthenticatedPage />
    }

    return <h2>404</h2>
}