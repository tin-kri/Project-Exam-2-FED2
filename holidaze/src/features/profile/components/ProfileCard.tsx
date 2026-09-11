import VenueImage from "@/components/ui/VenueImage";
import type { Profile } from "../types/profile.types";
import { Button } from "@/components/vendor/button";

interface ProfileProps {
  profile: Profile;
  onChangeAvatar: () => void;
}
export default function ProfileCard({ profile, onChangeAvatar }: ProfileProps) {
  return (
    <section className="bg-bg-card rounded-sm">
      <div className="flex flex-col items-center gap-2  py-8">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
          Hello {profile.name}
        </h1>
        {profile.venueManager && (
          <span className=" rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-navy-800">
            Venue Manager
          </span>
        )}
        <p className="text-grey-900 text-base ">{profile.email}</p>
       <VenueImage src={profile.avatar?.url}
          alt={profile.avatar?.alt?? "profile avatar"}
          className="h-25 w-25 rounded-sm mt-3"/>
        <Button variant="default" className="mt-3" onClick={onChangeAvatar}>
          Change Avatar
        </Button>
      </div>
    </section>
  );
}
