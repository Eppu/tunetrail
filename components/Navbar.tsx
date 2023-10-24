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
    // <header className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    //   <div className="flex-none px-2 mx-2">
    //     <span className="text-lg font-bold">Spotify Recommender</span>
    //   </div>
    //   <div className="flex-1 px-2 mx-2">
    //     <div className="items-stretch hidden lg:flex">
    //       <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
    //       <a className="btn btn-ghost btn-sm rounded-btn">About</a>
    //       <a className="btn btn-ghost btn-sm rounded-btn">Contact</a>
    //     </div>
    //   </div>
    //   <div className="flex-none">
    //     {!session && (
    //       <button className="btn btn-square btn-ghost" onClick={() => signIn()}>
    //         Login
    //       </button>
    //     )}
    //     {session && (
    //       <>
    //         <button className="btn btn-square btn-ghost"></button>
    //         <button className="btn btn-square btn-ghost" onClick={() => handleLogout()}>
    //           Logout
    //         </button>
    //       </>
    //     )}
    //   </div>

    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">TuneTrail</a>
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
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
    // </header>
  );
}
