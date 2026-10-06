import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturerDTO } from './manufacturer.dto';
import { ManufacturerEntity } from './manufacturer.entity';
import { uManufacturerDTO } from './umanufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async findAll(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find();
  }

  async createUser(manufacturerDTO: ManufacturerDTO): Promise<ManufacturerEntity> {
    const manufacturer = this.manufacturerRepository.create(manufacturerDTO);
    return await this.manufacturerRepository.save(manufacturer);
  }

  async modifyCountry(userId: number, newCountry: string): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOne({ where: { id: userId } });
    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }
    manufacturer.country = newCountry;
    return await this.manufacturerRepository.save(manufacturer);
  }

  async getUsersByJoiningDate(joiningDate: Date): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find({ where: { joiningDate } });
  }

  async getUsersWithDefaultCountry(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find({ where: { country: 'Unknown' } });
  }

  async updateUser(userId: number, umanufacturerDTO: uManufacturerDTO): Promise<ManufacturerEntity> {
    let manufacturer = await this.manufacturerRepository.findOne({ where: { id: userId } });
    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }
    manufacturer = { ...manufacturer, ...umanufacturerDTO };
    return await this.manufacturerRepository.save(manufacturer);
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.manufacturerRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('Manufacturer not found');
    }
  }

  async findByEmail(email: string): Promise<ManufacturerEntity | undefined> {
    return await this.manufacturerRepository.findOne({ where: { email:email } });
  }
}
