import PageWrapper from "@/components/layout/PageWrapper";
import ProfileCard from "../components/ProfileCard";
import useProfile from "../hooks/useProfile";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();
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
      <ProfileCard profile={profile} />
    </PageWrapper>
  );
}
