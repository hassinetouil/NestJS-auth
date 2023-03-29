import { IsNotEmpty } from 'class-validator';

export class CreateRolesDto {
  @IsNotEmpty()
  slug: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
