import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  name?: string;
  email: string;
  passwordHash: string; //TODO: Replace with a password string that will be encrypted

  @ApiHideProperty()
  createdAt: Date;
}
