import { redirect } from "next/navigation";

export default function Home() {

  redirect('/dashboard')

  return (
    <div>
      <h1>
        Ola mundo
      </h1>
    </div>
  );
}
