import { redirect } from "next/navigation";

export default function Home() {
  console.log("Redirecting to NFL teams page");
  redirect("/nfl/teams");
}
