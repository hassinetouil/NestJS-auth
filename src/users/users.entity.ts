import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import Roles from 'src/roles/roles.entity';
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  hash: string;
  @Column()
  api_key: string;
  @ManyToOne(() => Roles, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  roles: Roles;
  @Column({ default: () => '1' })
  password_change_required: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;
  @Column({ default: () => '0' })
  account_locked: number;
  @BeforeInsert()
  async hashPassword() {
    console.log(this.hash);
    this.hash = await bcrypt.hash(this.hash, 10);
  }
  @BeforeInsert()
  generateKey() {
    const bytes = crypto.randomBytes(32);
    this.api_key = bytes.toString('hex');
  }
  async validaePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hash);
  }
  toString(): string {
    return `User(id=${this.id}, username=${
      this.username
    }, role=${JSON.stringify(this.roles)})`;
  }
}
