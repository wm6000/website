export type UserProfile = {
  connections: {
    strava: { connected: boolean };
    googleCalendar: { connected: boolean };
    location: {
      method: "manual" | "gps" | null;
      label: string;
      lat?: number;
      lng?: number;
    };
  };
  fitness: {
    goals: string;
    targetEvents: { id: string; name: string; date: string }[];
    limitations: string;
  };
  ski: {
    types: string[];
    passes: string[];
  };
};

export const emptyProfile: UserProfile = {
  connections: {
    strava: { connected: false },
    googleCalendar: { connected: false },
    location: { method: null, label: "" },
  },
  fitness: {
    goals: "",
    targetEvents: [],
    limitations: "",
  },
  ski: {
    types: [],
    passes: [],
  },
};

const STORAGE_KEY = "profile";

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return emptyProfile;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyProfile;

  try {
    return { ...emptyProfile, ...JSON.parse(raw) } as UserProfile;
  } catch {
    return emptyProfile;
  }
}

export function saveProfile(profile: UserProfile): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
