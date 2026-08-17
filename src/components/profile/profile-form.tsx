"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ConnectionsSection } from "@/components/profile/connections-section";
import { FitnessSection } from "@/components/profile/fitness-section";
import { SkiSection } from "@/components/profile/ski-section";
import { emptyProfile, loadProfile, saveProfile, type UserProfile } from "@/lib/profile";

export function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    // localStorage isn't available during SSR, so the client-only value has
    // to be read post-mount; profile then becomes a local editable draft
    // that shouldn't keep re-syncing from storage on its own.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(loadProfile());
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setJustSaved(true);
  };

  const updateConnections = (connections: UserProfile["connections"]) => {
    setProfile((p) => ({ ...p, connections }));
    setJustSaved(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        Saved to this browser only, for now — cloud sync is coming later.
      </p>

      <ConnectionsSection value={profile.connections} onChange={updateConnections} />
      <FitnessSection />
      <SkiSection />

      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>Save</Button>
        {justSaved && (
          <span className="text-sm text-muted-foreground">Saved.</span>
        )}
      </div>
    </div>
  );
}
