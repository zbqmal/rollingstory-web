export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Work {
  id: string;
  type: string;
  title: string;
  description?: string;
  authorId: string;
  author?: User;
  pageCharLimit: number;
  allowCollaboration: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  workId: string;
  authorId: string;
  author?: User;
  content: string;
  pageNumber: number;
  createdAt: string;
}
