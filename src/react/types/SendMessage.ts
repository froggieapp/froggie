export interface SendMessageAPIResult {
  status: Status;
  data: Data;
}

interface Status {
  error: boolean;
  code: number;
  message: string;
}

interface Data {
  id: string;
  chatroom_id: number;
  content: string;
  type: string;
  created_at: string;
  sender: Sender;
}

interface Sender {
  id: number;
  username: string;
  slug: string;
  identity: Identity;
}

interface Identity {
  color: string;
  badges: unknown[];
}
