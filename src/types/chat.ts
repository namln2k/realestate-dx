export interface Conversation {
  id: string;
  title: string;
  timestamp: string;
}

export interface Message {
  role: string;
  content: string;
  timestamp: string;
}
