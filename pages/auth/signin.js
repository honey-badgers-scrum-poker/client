import {
  getProviders,
  signIn,
  useSession,
  signOut,
  getSession,
} from "next-auth/react";

export default function SignIn({ providers }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">
          Zaten giriş yaptın {session.user.name}
        </h1>
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Welcome to Poker</h1>
      <div className="flex flex-col items-center justify-center">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "/",
                })
              }
              className="p-6 mt-6 text-2xl font-bold text-white bg-blue-500 hover:opacity-95 rounded-lg"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
