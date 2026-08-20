"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { loadProfile } from "@/lib/profile";
import {
  CITIES,
  PASSES,
  SKI_LOCATIONS_BY_CITY,
  SKI_TYPES,
  type City,
  type SkiType,
} from "@/lib/ski-locations";

const SkiMap = dynamic(() => import("./ski-map").then((mod) => mod.SkiMap), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full rounded-lg border border-border bg-muted/30" />
  ),
});

type OutlookDay = {
  label: string;
  conditions: string;
  goodConditions: boolean;
  available: boolean;
};

const OUTLOOK: OutlookDay[] = [
  { label: "Today", conditions: "Fresh powder", goodConditions: true, available: true },
  { label: "Tomorrow", conditions: "Packed powder", goodConditions: true, available: false },
  { label: "Day 3", conditions: "Groomed corduroy", goodConditions: true, available: true },
  { label: "Day 4", conditions: "Spring slush", goodConditions: false, available: true },
  { label: "Day 5", conditions: "Rain, low visibility", goodConditions: false, available: false },
  { label: "Day 6", conditions: "Fresh powder", goodConditions: true, available: true },
  { label: "Day 7", conditions: "Packed powder", goodConditions: true, available: false },
];

function findCityFromLabel(label: string): City | null {
  const normalized = label.toLowerCase();
  return CITIES.find((city) => normalized.includes(city.toLowerCase())) ?? null;
}

export function SkiDashboard({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [city, setCity] = useState<City>("Seattle");
  const [pass, setPass] = useState(PASSES[0]);
  const [skiType, setSkiType] = useState<SkiType>("resort");

  useEffect(() => {
    if (!isLoggedIn) return;

    // localStorage isn't available during SSR, so the saved location has to
    // be read post-mount, same pattern as ProfileForm.
    const profile = loadProfile();
    const matched = findCityFromLabel(profile.connections.location.label);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCity(matched ?? "Seattle");
    setPass("Ikon");
  }, [isLoggedIn]);

  const locations = useMemo(() => {
    const cityLocations = SKI_LOCATIONS_BY_CITY[city];
    return [...cityLocations].sort((a, b) => {
      if (a.type === skiType && b.type !== skiType) return -1;
      if (a.type !== skiType && b.type === skiType) return 1;
      return 0;
    });
  }, [city, skiType]);

  return (
    <div className="mt-8 flex flex-col gap-10">
      {!isLoggedIn && (
        <section className="flex flex-col gap-3 rounded-lg border border-border p-5 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="text-sm font-medium">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value as City)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="pass" className="text-sm font-medium">
              Ski pass
            </label>
            <select
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {PASSES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ski-type" className="text-sm font-medium">
              Ski type
            </label>
            <select
              id="ski-type"
              value={skiType}
              onChange={(e) => setSkiType(e.target.value as SkiType)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {SKI_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">
          {isLoggedIn ? "Your Recommendation" : "Example Recommendation"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isLoggedIn
            ? `Based on your profile, here are your top picks near ${city}.`
            : `Example picks near ${city}, filtered for ${skiType} skiing${pass === "Any pass" ? "" : ` on an ${pass} pass`}.`}
        </p>

        <ol className="mt-4 flex flex-col gap-3">
          {locations.map((loc, index) => (
            <li key={loc.name} className="rounded-lg border border-border p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">
                  {index + 1}. {loc.name}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {loc.type} — {loc.pass}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{loc.blurb}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Map</h2>
        <div className="mt-4">
          <SkiMap key={city} locations={locations} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Next 7 Days</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Good days to ski — combining conditions with your calendar.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-muted-foreground">
          {OUTLOOK.map((day) => {
            const isGoodDay = day.goodConditions && day.available;
            return (
              <li key={day.label} className="flex items-center gap-2">
                <span className="text-foreground">{day.label}</span> —{" "}
                {day.conditions}, {day.available ? "you're free" : "you're busy"}
                {isGoodDay && (
                  <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">
                    Good day to ski
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
