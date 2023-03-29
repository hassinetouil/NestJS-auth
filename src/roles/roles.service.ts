import { Injectable } from '@nestjs/common';
import Roles from './roles.entity';
import { CreateRolesDto } from './create-roles.dto';

@Injectable()
export class RolesService {
  async getAllRoles(): Promise<Roles[]> {
    return Roles.find();
  }
  async create(createRolesDto: CreateRolesDto) {
    const role = new Roles();
    role.slug = createRolesDto.slug;
    role.name = createRolesDto.name;
    role.description = createRolesDto.description;
    await role.save();
    return role;
  }
  async getById(id: number): Promise<Roles> {
    return Roles.findOne({ where: { id } });
  }
}
