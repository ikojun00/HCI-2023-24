import HeroIcon from "@/components/icons/HeroIcon";
import HeroDashboardIcon from "../../../public/HeroDashboardIcon";

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

export default function HeroDashboard({ session }: Props) {
  return (
    
        <div className="flex flex-col gap-5 text-white mt-8">
          <div className="flex flex-col lg:flex-row-reverse justify-between gap-4">
            <div className="w-full lg:w-fit px-2 lg:pb-4 flex justify-center lg:block">
              <HeroDashboardIcon />
            </div>
            <div className="flex flex-col lg:w-1/2 items-center lg:justify-center lg:items-start gap-5">
              <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-start">
                Welcome, {session.user.firstName}!
              </h1>
              <h2 className="text-md sm:text-lg font-medium text-center lg:text-start">
                Here is what You have been reading...
              </h2>
            </div>
          </div>
        </div>
  );
}
