import { User } from '@prisma/client';

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export function toUserWithoutPassword(user: User): UserWithoutPassword {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
