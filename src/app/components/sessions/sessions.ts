export interface Sessions extends Array<Sessions> {
  user: string;
  action: string;
  created_at: number;
}
