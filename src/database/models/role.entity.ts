import { STATUS } from "src/utils/constants";
import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./permission.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', name: 'name', nullable: false })
    public name: string;

    @Column({ type: 'varchar', name: 'status', default: STATUS.ACTIVE })
    public status: string;

    /**
     * Managing associations
     */
    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({ 
        name: 'role_permissions', 
        joinColumn: { name: 'role_id' }, 
        inverseJoinColumn: { name: 'permission_id' },
    })
    permissions: Permission[];

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}