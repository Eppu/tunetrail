import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="navbar bg-base-100 mb-2 text-neutral-content rounded-box shadow-lg">
      <div className="flex-1">
        <h1 className="btn btn-ghost normal-case text-xl">TuneTrail</h1>
      </div>
      <div className="flex-none">
        {!session && (
          <button className="btn btn-ghost" onClick={() => signIn()}>
            Log in
          </button>
        )}
        {session && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.user!.image as string}
                  alt="profile picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-24"
              onClick={() => handleLogout()}
            >
              <li>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
