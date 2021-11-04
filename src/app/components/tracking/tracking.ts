export interface Tracking extends Array<Tracking> {
  user: string;
  latitude: number;
  longitude: number;
  created_at: number;
}
