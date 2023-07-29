import { hash } from 'bcrypt';

import { Role } from './role.entity';
import { SETTING_TYPE, STATUS } from 'src/utils/constants';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BeforeUpdate } from "typeorm";

@Entity({ name: 'settings' })
export class Setting {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', name: 'name', nullable: false })
    public name: string;

    @Column({ type: 'varchar', name: 'code', nullable: false })
    public code: string;

    @Column({ type: 'varchar', name: 'type', default: null })
    public type: string;

    @Column({ type: 'text', name: 'description', default: null })
    public description: string;

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}
