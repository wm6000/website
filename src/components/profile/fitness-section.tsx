"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UserProfile } from "@/lib/profile";

type Fitness = UserProfile["fitness"];

export function FitnessSection({
  value,
  onChange,
}: {
  value: Fitness;
  onChange: (value: Fitness) => void;
}) {
  const addTargetEvent = () => {
    onChange({
      ...value,
      targetEvents: [
        ...value.targetEvents,
        { id: crypto.randomUUID(), name: "", date: "" },
      ],
    });
  };

  const updateTargetEvent = (
    id: string,
    patch: Partial<{ name: string; date: string }>
  ) => {
    onChange({
      ...value,
      targetEvents: value.targetEvents.map((event) =>
        event.id === id ? { ...event, ...patch } : event
      ),
    });
  };

  const removeTargetEvent = (id: string) => {
    onChange({
      ...value,
      targetEvents: value.targetEvents.filter((event) => event.id !== id),
    });
  };

  return (
    <section aria-labelledby="fitness-heading" className="flex flex-col gap-4">
      <h2 id="fitness-heading" className="text-lg font-semibold">
        Fitness
      </h2>

      <div className="flex flex-col gap-2">
        <Label htmlFor="fitness-goals">Long-term goals</Label>
        <Textarea
          id="fitness-goals"
          placeholder="e.g. build a base for a spring marathon"
          value={value.goals}
          onChange={(e) => onChange({ ...value, goals: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Target events</Label>

        {value.targetEvents.length > 0 && (
          <div className="flex flex-col gap-2">
            {value.targetEvents.map((event) => (
              <div key={event.id} className="flex flex-col gap-2 sm:flex-row">
                <Input
                  aria-label="Event name"
                  placeholder="Event name"
                  value={event.name}
                  onChange={(e) =>
                    updateTargetEvent(event.id, { name: e.target.value })
                  }
                />
                <Input
                  aria-label="Event date"
                  type="date"
                  value={event.date}
                  onChange={(e) =>
                    updateTargetEvent(event.id, { date: e.target.value })
                  }
                  className="sm:max-w-[10rem]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove target event"
                  className="shrink-0"
                  onClick={() => removeTargetEvent(event.id)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={addTargetEvent}
        >
          Add target event
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="fitness-limitations">
          Physical limitations / injuries
        </Label>
        <Textarea
          id="fitness-limitations"
          placeholder="e.g. low back tight, avoid high-impact for now"
          value={value.limitations}
          onChange={(e) => onChange({ ...value, limitations: e.target.value })}
        />
      </div>
    </section>
  );
}
