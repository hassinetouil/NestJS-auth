import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.username = createUserDto.username;
    user.hash = createUserDto.hash;
    user.roles = createUserDto.role;
    console.log(user.roles.id);
    await user.save();
    return user;
  }
  async showById(id: number): Promise<Users> {
    return await this.findById(id);
  }
  async findById(id: number) {
    return await Users.findOne({ relations: ['roles'], where: { id: id } });
  }
  async findByUserName(userName: string) {
    try {
      return await Users.findOne({
        relations: ['roles'],
        where: { username: userName },
      });
    } catch (error) {
      throw new HttpException("can't find username", HttpStatus.BAD_REQUEST);
    }
  }
}
