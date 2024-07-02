import UserOverview from "./UserOverview";
import DashboardBookSection from "./DashboardBookSection";
import DashboardReviewsSection from "./DashboardReviewsSection";
import HeroDashboard from "./HeroDashboard";
import DiscoverCTA from "./DiscoverCTA";

interface BookshelfItem {
  shelf: number;
  bookIds: [];
}

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

export default function Dashboard({ session }: Props) {
  return (
    <>
      <div className="bg-bv-blue-dark">
        <div className="flex flex-col max-w-screen-lg mx-auto px-6 sm:px-8 py-12">
          <HeroDashboard session={session} />
        </div>
      </div>

      <div className="flex flex-col max-w-screen-lg mx-auto px-6 sm:px-8 gap-28 mt-24">
        {/* User's overview section */}
        <UserOverview session={session} />

        {/* New on Bookvoyage section */}
        <DashboardBookSection sectionName="New on Bookvoyage" />

        {/* New on Bookvoyage section */}
        <DashboardBookSection sectionName="Popular on Bookvoyage" />

        {/* Latest reviews on Bookvoyage section */}
        <DashboardReviewsSection session={session} />

        {/* Discover Call To Action */}
        <DiscoverCTA />
      </div>
    </>
  );
}
