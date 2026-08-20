export type SkiType = "resort" | "backcountry" | "nordic";

export type SkiLocation = {
  name: string;
  type: SkiType;
  pass: string;
  lat: number;
  lng: number;
  blurb: string;
};

export const CITIES = ["Seattle", "Portland", "Spokane", "Tacoma", "Bend"] as const;
export type City = (typeof CITIES)[number];

export const SKI_TYPES: { value: SkiType; label: string }[] = [
  { value: "resort", label: "Resort" },
  { value: "backcountry", label: "Backcountry" },
  { value: "nordic", label: "Nordic" },
];

export const PASSES = ["Any pass", "Ikon", "Epic", "Indy", "Mountain Collective", "Independent"];

export const SKI_LOCATIONS_BY_CITY: Record<City, SkiLocation[]> = {
  Seattle: [
    {
      name: "Crystal Mountain",
      type: "resort",
      pass: "Ikon",
      lat: 46.9348,
      lng: -121.474,
      blurb: "The largest resort in the state, with wide-open bowls and a gondola.",
    },
    {
      name: "Alpental Backcountry",
      type: "backcountry",
      pass: "Independent",
      lat: 47.4394,
      lng: -121.4258,
      blurb: "Steep, avalanche-terrain access right off the Snoqualmie Pass parking lot.",
    },
    {
      name: "Stevens Pass Nordic Center",
      type: "nordic",
      pass: "Epic",
      lat: 47.7448,
      lng: -121.089,
      blurb: "Groomed cross-country trails through old-growth forest.",
    },
  ],
  Portland: [
    {
      name: "Mt. Hood Meadows",
      type: "resort",
      pass: "Ikon",
      lat: 45.3311,
      lng: -121.6656,
      blurb: "Mt. Hood's biggest resort, with terrain for every level.",
    },
    {
      name: "Cooper Spur Backcountry",
      type: "backcountry",
      pass: "Independent",
      lat: 45.4547,
      lng: -121.6392,
      blurb: "Quiet, low-angle touring on Mt. Hood's north side.",
    },
    {
      name: "Teacup Nordic",
      type: "nordic",
      pass: "Independent",
      lat: 45.3236,
      lng: -121.7156,
      blurb: "Volunteer-groomed Nordic trails near Government Camp.",
    },
  ],
  Spokane: [
    {
      name: "Schweitzer",
      type: "resort",
      pass: "Indy",
      lat: 48.3667,
      lng: -116.6206,
      blurb: "Sweeping views of Lake Pend Oreille from two connected bowls.",
    },
    {
      name: "Mount Spokane Backcountry",
      type: "backcountry",
      pass: "Independent",
      lat: 47.9206,
      lng: -117.1122,
      blurb: "Easy-access sidecountry gladed runs just past the resort boundary.",
    },
    {
      name: "Mount Spokane Nordic",
      type: "nordic",
      pass: "Independent",
      lat: 47.9206,
      lng: -117.1122,
      blurb: "Groomed classic and skate trails on the mountain's lower slopes.",
    },
  ],
  Tacoma: [
    {
      name: "Crystal Mountain",
      type: "resort",
      pass: "Ikon",
      lat: 46.9348,
      lng: -121.474,
      blurb: "The largest resort in the state, with wide-open bowls and a gondola.",
    },
    {
      name: "White Pass Backcountry",
      type: "backcountry",
      pass: "Independent",
      lat: 46.6363,
      lng: -121.3919,
      blurb: "Mellow tree runs and bowls above the resort's high-speed quad.",
    },
    {
      name: "Snoqualmie Nordic Center",
      type: "nordic",
      pass: "Independent",
      lat: 47.4229,
      lng: -121.4136,
      blurb: "Family-friendly groomed loops at the summit.",
    },
  ],
  Bend: [
    {
      name: "Mt. Bachelor",
      type: "resort",
      pass: "Mountain Collective",
      lat: 43.9792,
      lng: -121.6883,
      blurb: "360-degree summit access on a nearly symmetrical volcanic cone.",
    },
    {
      name: "Tumalo Mountain Backcountry",
      type: "backcountry",
      pass: "Independent",
      lat: 43.97,
      lng: -121.64,
      blurb: "A classic Central Oregon skin-up with views of the Three Sisters.",
    },
    {
      name: "Meissner Nordic",
      type: "nordic",
      pass: "Independent",
      lat: 43.95,
      lng: -121.73,
      blurb: "Non-motorized, dog-friendly groomed trails outside Bend.",
    },
  ],
};
