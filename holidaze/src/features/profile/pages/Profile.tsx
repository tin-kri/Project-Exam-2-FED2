import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ProfileCard from "../components/ProfileCard";
import useProfile from "../hooks/useProfile";
import AvatarModal from "../components/AvatarModule";
import FutureBookings from "../components/FutureBookingsCard";
import PreviousBookings from "../components/PreviousBookingsCard";

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
      <FutureBookings profile={profile} />
      <PreviousBookings profile={profile} />
    </PageWrapper>
  );
}
