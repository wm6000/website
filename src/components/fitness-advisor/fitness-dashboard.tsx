"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const BASE_RECOMMENDATION =
  "Easy 45-minute run. Training load is elevated from Saturday's long run — keep intensity low and skip strength work today.";

const BASE_TODAY_ACTIVITY = "Easy 45 min run";

type LookaheadEntry = { label: string; activity: string };

const initialLookahead: LookaheadEntry[] = [
  { label: "Today", activity: BASE_TODAY_ACTIVITY },
  { label: "Tomorrow", activity: "Rest" },
  { label: "Day 3", activity: "Long run — 10-12 mi" },
  { label: "Day 4", activity: "Recovery walk or yoga" },
  { label: "Day 5", activity: "Interval workout" },
  { label: "Day 6", activity: "Easy run" },
  { label: "Day 7", activity: "Rest" },
];

const pastActivities = [
  { label: "2 days ago", activity: "Interval workout — 6.1 mi" },
  { label: "4 days ago", activity: "Long run — 12.4 mi" },
  { label: "6 days ago", activity: "Rest" },
];

export function FitnessDashboard() {
  const [recommendation, setRecommendation] = useState(BASE_RECOMMENDATION);
  const [lookahead, setLookahead] = useState(initialLookahead);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustmentText, setAdjustmentText] = useState("");

  const submitAdjustment = () => {
    const note = adjustmentText.trim();
    if (!note) return;

    setRecommendation(`Updated based on your note: "${note}."`);
    setLookahead((current) =>
      current.map((entry, index) =>
        index === 0 ? { ...entry, activity: `Adjusted — ${note}` } : entry
      )
    );
    setAdjustmentText("");
    setIsAdjusting(false);
  };

  const cancelAdjustment = () => {
    setAdjustmentText("");
    setIsAdjusting(false);
  };

  return (
    <div className="mt-8 flex flex-col gap-10">
      <section>
        <h2 className="text-xl font-semibold">Today&apos;s Recommendation</h2>
        <div className="mt-3 rounded-lg border border-border p-5">
          <p>{recommendation}</p>
        </div>

        {isAdjusting ? (
          <div className="mt-3 flex flex-col gap-2">
            <Textarea
              aria-label="Adjustment note"
              placeholder="e.g. I'm feeling sore today, or I only have 30 minutes"
              value={adjustmentText}
              onChange={(e) => setAdjustmentText(e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={submitAdjustment}>
                Submit
              </Button>
              <Button variant="outline" size="sm" onClick={cancelAdjustment}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setIsAdjusting(true)}
          >
            Adjust Recommendation
          </Button>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Past Activities</h2>
        <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
          {pastActivities.map((entry) => (
            <li key={entry.label}>
              <span className="text-foreground">{entry.label}</span> —{" "}
              {entry.activity}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Next 7 Days</h2>
        <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
          {lookahead.map((entry) => (
            <li key={entry.label}>
              <span className="text-foreground">{entry.label}</span> —{" "}
              {entry.activity}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
