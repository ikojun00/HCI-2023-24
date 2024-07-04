import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "@/views/navbar/Button";
import Spinner from "./icons/Spinner";
import PlaceholderIcon from "./icons/PlaceholderIcon";
import ContentfulService from "@/services/ContentfulService";
import ProfileImageItem from "../../types/interfaces/ProfileImageItem";

export default function SignInForm() {
  const { data: session, status } = useSession();
  const [image, setImage] = useState<ProfileImageItem | null>(null);

  useEffect(() => {
    (async () => {
      if (session?.user.profileImageId) {
        const data = await ContentfulService.getProfileImageById(
          session.user.profileImageId
        );
        setImage(data);
      }
    })();
  }, [session?.user.profileImageId]);

  if (status === "loading") {
    return <Spinner />;
  }

  return session && session.user ? (
    <div className="flex items-center">
      <button className="relative w-10 h-10 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
        <Link href={"/profile"}>
          {image ? (
            <Image
              className="circle-image"
              height={64}
              width={64}
              sizes="100vw"
              src={image.image.url}
              alt="Profile Photo"
            />
          ) : (
            <div className="absolute w-12 h-12 text-gray-500 -right-1 -bottom-2">
              <PlaceholderIcon />
            </div>
          )}
        </Link>
      </button>

      {/*{activeDropdown && (
        <div className="z-10 relative bg-bv-blue rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
          <div className="flex flex-col gap-4">
            <p className="text-sky-600">{session.user.firstName}</p>
            <p className="text-sky-600">{session.user.email}</p>
            <Link
              href={"/api/auth/signout"}
              className="flex gap-4 text-red-600"
            >
              Sign Out
            </Link>
          </div>
        </div>
      )}*/}
    </div>
  ) : (
    <div className="flex gap-4 ml-auto items-center">
      <Button title={"Sign In"} link={"/api/auth/signin"} />
    </div>
  );
}
