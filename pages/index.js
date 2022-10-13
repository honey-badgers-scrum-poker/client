import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Hoşgeldin {session.user.name}</h1>
        <img src={session.user.image} alt="profile" />
        <button
          onClick={() => signOut()}
          className="p-6 mt-6 text-2xl font-bold text-white bg-blue-500 hover:opacity-95 rounded-lg"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Scrum Poker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Welcome to Poker</h1>
        <div className="flex flex-col items-center justify-center">
          <Link href="/auth/signin">
            <a className="p-6 mt-6 text-2xl font-bold text-white bg-blue-500 hover:opacity-95 rounded-lg">
              Giriş Yap
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
