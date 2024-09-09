import { User } from 'src/schemas/user.schema';

export interface UserRepository {
  findById(userId: string): Promise<User>;
}
