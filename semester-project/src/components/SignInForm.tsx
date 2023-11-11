import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Profile from "@/views/dropdown/Profile";

export default function SignInForm() {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const { data: session, status } = useSession();

  const handleDropdownClick = () => {
    setActiveDropdown(!activeDropdown);
  };

  return (
    <div>
      {status !== "authenticated" ? (
        <button
          className="bg-green-600 max-w-fit rounded-lg hover:bg-green-700"
          onClick={() => signIn("google")}
        >
          <h2 className="px-4 py-2">Login</h2>
        </button>
      ) : (
        <button onClick={handleDropdownClick}>
          <Image
            src={session?.user?.image ?? ""}
            alt="Profile"
            className="rounded-full"
            width={35}
            height={35}
          />
        </button>
      )}

      {activeDropdown && (
        <div className="block mb-0">
          <Profile />
        </div>
      )}
    </div>
  );
}
