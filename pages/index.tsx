import { Main } from "../components/main";
import { useSession } from "next-auth/react";


export default function Home() {
  const { status } = useSession({ required: true })

  if (status === "authenticated") {
    return (
      <Main />
    )
  }
}