export interface Comments {
  id: number;
  score: number;
  png: string;
  user: User;
  createdAt: string;
  content: string;
  replyingTo: string;
  replies: any;
}
interface User {
  image: Image;
  username: string;
}

interface Image {
  png: string;
}

