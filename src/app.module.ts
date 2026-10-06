import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { WeaponModule } from './weapon/weapon.module'; // Import the WeaponModule
import { OrderedWeaponModule } from './OrderWeapon/ordered-weapon.module';
import { AuthModule } from './Manufacturer/auth/auth.module';
@Module({
  imports: [
    ManufacturerModule,
    WeaponModule,
    OrderedWeaponModule, // Include WeaponModule here
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'storage',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
