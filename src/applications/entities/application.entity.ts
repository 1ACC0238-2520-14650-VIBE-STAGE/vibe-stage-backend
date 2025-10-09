export class Application {
  id: number;
  eventId: number;
  artistId: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
}
