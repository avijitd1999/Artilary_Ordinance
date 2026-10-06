import { Controller, Post, Body, Put, Param, Get, Delete,Res, HttpException, HttpStatus, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WeaponService } from './weapon.service';
import { WeaponDTO } from './weapon.dto';
import { WeaponEntity } from './weapon.entity';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  async findAll(): Promise<WeaponEntity[]> {
    return await this.weaponService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createWeapon(@Body() weaponDTO: WeaponDTO): Promise<WeaponEntity> {
    return await this.weaponService.createWeapon(weaponDTO);
  }

  @Put(':id')
  async updateWeapon(@Param('id') weaponId: number, @Body() weaponDTO: WeaponDTO): Promise<WeaponEntity> {
    return await this.weaponService.updateWeapon(weaponId, weaponDTO);
  }

  @Delete(':id')
  async deleteWeapon(@Param('id') weaponId: number): Promise<void> {
    return await this.weaponService.deleteWeapon(weaponId);
  }

  @Put(':id/pdf')
  @UseInterceptors(FileInterceptor('pdf', {
      storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
          }
      })
  }))
  async uploadPdf(
      @Param('id') weaponId: number,
      @UploadedFile() pdfFile: Express.Multer.File): Promise<{ pdfFilePath: string }> { // Change the return type to string
      try {
          const result = await this.weaponService.uploadPdf(weaponId, pdfFile);
          return result; // Return the file path directly
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
  }
  
  @Get(':id/pdf')
  async downloadPdf(@Param('id') weaponId: number, @Res() res: any): Promise<void> {
      try {
          const pdfPath = await this.weaponService.getPdfFilePath(weaponId);
          res.download(pdfPath); // Stream the PDF file back to the client
      } catch (error) {
          throw new HttpException('PDF file not found', HttpStatus.NOT_FOUND);
      }
  }
}
