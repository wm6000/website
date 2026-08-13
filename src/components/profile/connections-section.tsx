"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserProfile } from "@/lib/profile";

type Connections = UserProfile["connections"];

export function ConnectionsSection({
  value,
  onChange,
}: {
  value: Connections;
  onChange: (value: Connections) => void;
}) {
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Location isn't supported by this browser.");
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({
          ...value,
          location: {
            method: "gps",
            label: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
            lat: latitude,
            lng: longitude,
          },
        });
      },
      () => {
        setLocationError(
          "Couldn't get your location. Try entering it manually."
        );
      }
    );
  };

  return (
    <section
      aria-labelledby="connections-heading"
      className="flex flex-col gap-4"
    >
      <h2 id="connections-heading" className="text-lg font-semibold">
        Connections
      </h2>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
        <div>
          <p className="text-sm font-medium">Strava</p>
          <p className="text-sm text-muted-foreground">
            {value.strava.connected ? "Connected" : "Not connected"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...value,
              strava: { connected: !value.strava.connected },
            })
          }
        >
          {value.strava.connected ? "Disconnect" : "Connect"}
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
        <div>
          <p className="text-sm font-medium">Google Calendar</p>
          <p className="text-sm text-muted-foreground">
            {value.googleCalendar.connected ? "Connected" : "Not connected"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...value,
              googleCalendar: { connected: !value.googleCalendar.connected },
            })
          }
        >
          {value.googleCalendar.connected ? "Disconnect" : "Connect"}
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-border px-4 py-3">
        <Label htmlFor="location">Location</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="location"
            placeholder="City, region"
            value={value.location.label}
            onChange={(e) =>
              onChange({
                ...value,
                location: { method: "manual", label: e.target.value },
              })
            }
          />
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={handleUseCurrentLocation}
          >
            Use my location
          </Button>
        </div>
        {value.location.method === "gps" && (
          <p className="text-sm text-muted-foreground">
            Using your current location.
          </p>
        )}
        {locationError && (
          <p className="text-sm text-destructive">{locationError}</p>
        )}
      </div>
    </section>
  );
}
