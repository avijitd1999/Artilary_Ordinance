import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ManufacturerEntity } from '../manufacturer/manufacturer.entity';

@Entity()
export class WeaponEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ default: 0 })
  available: number;

  @Column({ nullable: true })
  pdfFilePath: string;

  @ManyToOne(() => ManufacturerEntity, manufacturer => manufacturer.weapons)
  manufacturer: ManufacturerEntity; // Check if this line is correct
}
