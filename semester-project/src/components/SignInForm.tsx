import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Profile from "@/views/navbar/Profile";
import Link from "next/link";
import Button from "@/views/navbar/Button";

export default function SignInForm() {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const { data: session, status } = useSession();

  const handleDropdownClick = () => {
    setActiveDropdown(!activeDropdown);
  };

  return (
    <div>
      {status !== "authenticated" ? (
        <Button title={"Login"} link={"/signin"} />
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
