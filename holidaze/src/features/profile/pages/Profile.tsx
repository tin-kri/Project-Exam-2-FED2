import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ProfileCard from "../components/ProfileCard";
import useProfile from "../hooks/useProfile";
import AvatarModal from "../components/AvatarModule";
import UserBookings from "../components/UserBookings";

import VenueManagerSection from "@/features/venue-management/components/VenueManagerSection";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  if (isLoading)
    return (
      <PageWrapper>
        <p>Loading…</p>
      </PageWrapper>
    );
  if (error)
    return (
      <PageWrapper>
        <p role="alert">{error}</p>
      </PageWrapper>
    );
  if (!profile) return null;
  return (
    <PageWrapper>
      <ProfileCard
        profile={profile}
        onChangeAvatar={() => setIsAvatarModalOpen(true)}
      />
      {isAvatarModalOpen && (
        <AvatarModal
          currentUrl={profile.avatar?.url}
          onClose={() => setIsAvatarModalOpen(false)}
        />
      )}

        {/* {profile.venueManager &&(<Link
            to="/manage-venues"
            className="font-semibold text-navy-800 underline underline-offset-4"
          >
            Create a New Venue
          </Link>)} */}


      {profile.venueManager && ( 
        <VenueManagerSection /> 
      )}
  {/* <Link
            to="/manage-venues/"
            className="text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-sky-300"
          >
            + Create new venue
          </Link> */}

      <UserBookings profile={profile} />
   
    </PageWrapper>
  );
}
