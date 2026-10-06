// manufacturer.controller.ts
import { Controller, Get, Post,Put, Body, Patch, Param, Delete, Query, Res,Request,UseGuards, } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerDTO } from './manufacturer.dto';
import { ManufacturerEntity } from './manufacturer.entity';
import { uManufacturerDTO } from './umanufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  async findAll(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerService.findAll();
  }

  @Post()
  async createUser(@Body() manufacturerDTO: ManufacturerDTO): Promise<ManufacturerEntity> {
    return await this.manufacturerService.createUser(manufacturerDTO);
  }

  @Patch(':id/country')
  async modifyCountry(@Param('id') userId: number, @Body('country') newCountry: string): Promise<ManufacturerEntity> {
    return await this.manufacturerService.modifyCountry(userId, newCountry);
  }

  @Put(':id')
  async updateUser(@Param('id') userId: number, @Body() umanufacturerDTO: uManufacturerDTO): Promise<ManufacturerEntity> {
    return await this.manufacturerService.updateUser(userId, umanufacturerDTO);
  }

  @Get('joining-date')
  async getUsersByJoiningDate(@Query('date') joiningDate: Date): Promise<ManufacturerEntity[]> {
    return await this.manufacturerService.getUsersByJoiningDate(joiningDate);
  }

  @Get('default-country')
  async getUsersWithDefaultCountry(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerService.getUsersWithDefaultCountry();
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    return await this.manufacturerService.deleteUser(userId);
  }

}

