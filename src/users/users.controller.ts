import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { LoginUserDto } from './login-user.dto';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const role = await this.rolesService.getById(createUserDto.role_id);
    createUserDto.role = role;
    return this.usersService.create(createUserDto);
  }
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByUserName(loginUserDto.username);
    const result = await bcrypt.compare(loginUserDto.password, user.hash);
    if (result) {
      return user;
    } else {
      return "dosen't exisest usere with this password";
    }
  }
}
