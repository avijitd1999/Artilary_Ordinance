// manufacturer.dto.ts
import { IsString, IsEmail, IsNotEmpty, Matches, IsUrl, IsPhoneNumber, IsDate } from 'class-validator';

export class ManufacturerDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[@#$&]).*$/, { message: 'Password must contain at least one of the following characters: @, #, $, &' })
  password: string;

  @IsUrl()
  socialMediaLink: string;

  @IsNotEmpty({ message: 'Invalid phone number' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'enter date number' })
  joiningDate: Date;
  @IsString()
  country: string;

}

export class loginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
