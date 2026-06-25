export interface Site {
  id: string;
  name: string;
  shortName: string;
  region: string;
  x: number;
  y: number;
  category: string;
  summary: string;
  verificationNote: string;
  navigationQuery: string;
  videoSearchUrl: string;
  image: string;
  imageAlt: string;
  address: string;
  stage: string;
  kind: "memorial" | "battlefield" | "command" | "uprising";
  eventDate: string;
  eventTitle: string;
  labelPosition: "left" | "right" | "top" | "bottom";
  tags: string[];
  history: string;
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  videoUrl: string | null;
  sources: Array<{
    title: string;
    url: string | null;
  }>;
  contentStatus: {
    history: string;
    images: string;
    video: string;
  };
}

export type AppView = "map" | "timeline" | "directory" | "about";
