//manufacturer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WeaponEntity } from '../weapon/weapon.entity';
import { isNotEmpty } from 'class-validator';

@Entity()
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  socialMediaLink: string;

  @Column()
  phoneNumber: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  joiningDate: Date;
 
  @Column({ default: 'Unknown', length: 30 })
  country: string;

  @OneToMany(() => WeaponEntity, weapon => weapon.manufacturer)
  weapons: WeaponEntity[];
}
