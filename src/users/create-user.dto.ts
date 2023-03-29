import { IsNotEmpty } from 'class-validator';
import Roles from 'src/roles/roles.entity';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  role_id: number;
  role: Roles;
}
