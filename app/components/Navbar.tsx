import { auth, signOut, signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-md px-5 py-3">
      <nav className="flex items-center justify-between">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="Logo" width={140} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black ">
          {session && session.user ? (
            <>
              <Link href={"startup/create"}>
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" }); 
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session.user?.id}`}>
                <span>{session.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>LogIn</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
