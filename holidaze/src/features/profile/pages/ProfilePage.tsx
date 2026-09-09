import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ProfileCard from "../components/ProfileCard";
import useProfile from "../hooks/useProfile";
import AvatarModal from "../components/AvatarModule";
import UserBookings from "../components/UserBookings";
import VenueManagerSection from "@/features/venue-management/components/VenueManagerSection";
import Breadcrumbs from "@/components/layout/HolidazeBreadcrumbs";

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
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />
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

      {profile.venueManager && <VenueManagerSection />}

      <UserBookings profile={profile} />
    </PageWrapper>
  );
}
