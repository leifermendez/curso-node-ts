export default interface Track {
    name: string;
    email: string;
    album: string;
    cover: string;
    artist: { name: string; nickname: string; nationality: string };
    duration: { start: number; end: number };
    mediaId: string;
  }