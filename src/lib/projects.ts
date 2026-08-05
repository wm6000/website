export interface Project {
  slug: string;
  name: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: "disaster-response-pipeline",
    name: "Disaster Response Pipeline",
    description:
      "NLP/ML pipeline that classifies incoming messages during disaster response to help route them to the right relief effort.",
  },
  {
    slug: "whale-blog",
    name: "Whale Blog",
    description: "A content and research blog.",
  },
];
