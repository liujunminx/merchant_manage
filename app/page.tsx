import Link from "next/link";
import ProtectedRoute from "@/app/protectedRoute";

export default function Home() {

  return (
    <main>
      <ProtectedRoute>
        <Link href="sign-in">Home</Link>
      </ProtectedRoute>
    </main>
  )
}
