import { Injectable } from '@nestjs/common';
import { ManufacturerService } from '../manufacturer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginDTO } from '../manufacturer.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly manufacturerService: ManufacturerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: loginDTO): Promise<string> {
    const manufacturer = await this.manufacturerService.findByEmail(loginData.email);
    if (!manufacturer) {
      throw new Error('Manufacturer not found');
    }

    const passwordMatch = await bcrypt.compare(loginData.password, manufacturer.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const payload = { id: manufacturer.id, email: manufacturer.email };
    return this.jwtService.sign(payload);
  }
}
