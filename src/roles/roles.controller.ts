import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import Roles from './roles.entity';
import { CreateRolesDto } from './create-roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  async getAllRoles(): Promise<Roles[]> {
    return this.rolesService.getAllRoles();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }
  @Post()
  create(@Body() createRolesDto: CreateRolesDto) {
    return this.rolesService.create(createRolesDto);
  }
}
