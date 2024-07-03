import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditProfileImage from "../../../public/EditProfileImage";
import Image from "next/image";
import ProfileImageItem from "../../../types/interfaces/ProfileImageItem";
import ContentfulService from "@/services/ContentfulService";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface Props {
  session: Session;
}

export default function AboutMeTab({ session }: Props) {
  const [firstName, setFirstName] = useState(session.user.firstName);
  const [lastName, setLastName] = useState(session.user.firstName);
  const [email, setEmail] = useState(session.user.email);
  const [isChanged, setIsChanged] = useState(false);

  const [profileImages, setProfileImages] = useState<ProfileImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setProfileImages(await ContentfulService.getAllProfileImages());
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChanged) return;
    console.log("submitting");
  };

  const handleProfilePhotoClick = () => {
    console.log("Profile Photo Clicked");
  };

  return (
    <div className="flex gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full lg:w-3/5"
      >
        <div className="flex flex-col gap-1">
          <label className="uppercase text-gray-400 min-w-fit text-sm">
            Profile Photo
          </label>
          <div className="flex justify-center lg:justify-start items-center gap-2 sm:gap-4 mt-1">
            {profileImages.map((item) => (
              <div
                key={item.id}
                onClick={handleProfilePhotoClick}
                className="flex shrink-0 justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:h-16 md:w-16 border-2 hover:border-bv-purple duration-300 transition-colors rounded-full overflow-hidden cursor-pointer"
              >
                <Image
                  className="circle-image"
                  height={64}
                  width={64}
                  sizes="100vw"
                  src={item.image.url}
                  alt="Profile Photo"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase text-gray-400 min-w-fit text-sm">
            First Name
          </label>
          <div className="px-4 flex border rounded-md py-1 bg-bv-blue-light">
            <input
              className="w-full h-full focus:outline-none text-base bg-transparent"
              id="name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setIsChanged(true);
                setFirstName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase text-gray-400 min-w-fit text-sm">
            Last Name
          </label>
          <div className="px-4 flex border rounded-md py-1 bg-bv-blue-light">
            <input
              className="w-full h-full focus:outline-none text-base bg-transparent"
              id="name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setIsChanged(true);
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase text-gray-400 min-w-fit text-sm">
            Email
          </label>
          <div className="px-4 flex border rounded-md py-1 bg-bv-blue-light">
            <input
              className="w-full h-full focus:outline-none text-base bg-transparent"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setIsChanged(true);
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`${
              isChanged
                ? "bg-bv-green hover:bg-bv-green-dark cursor-pointer"
                : "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
            }  font-medium text-base flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer transition-all duration-300`}
          >
            Update Profile
          </button>
        </div>
      </form>
      <div className="hidden lg:w-2/5 lg:flex lg:items-center lg:justify-center">
        <EditProfileImage />
      </div>
    </div>
  );
}
