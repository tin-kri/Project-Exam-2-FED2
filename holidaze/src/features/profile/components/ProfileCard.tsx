import type { Profile } from "../types/profile.types";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  profile: Profile;
}
export default function ProfileCard({ profile }: ProfileProps) {
  return (
    <section className="bg-bg-card rounded-sm">
      <div className="flex flex-col items-center gap-4  bg-sand-100 px-6 py-8">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
          Hello {profile.name}
        </h1>
        <img
          src={profile.avatar?.url}
          alt={profile.avatar?.alt}
          className="h-25 w-25 rounded-sm"
        />
        <p className="text-grey-900 text-base">{profile.email}</p>
        <Button variant="outline" className="mt-4 ">
          Change Avatar
        </Button>
      </div>
    </section>
  );
}
