export enum TourStatus {
  Using = 0,
  NotUsing = 1
}

export enum TourType {
  Video = 0,
  Tour = 1
}

export interface Tour {
  id: number;
  type: TourType;
  title: string;
  description: string;
  lang: string;
  module: number;
  status: TourStatus;
}

export interface TourContent {
  id: number;
  tourId: number;
  title: string;
  content: string;
  step: number;
  display: boolean;
}