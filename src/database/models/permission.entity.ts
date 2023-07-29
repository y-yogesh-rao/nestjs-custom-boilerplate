import { STATUS } from "src/utils/constants";
import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'permissions' })
export class Permission {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', name: 'permission_code', nullable: false })
    public permissionCode: string;

    @Column({ type: 'varchar', name: 'status', default: STATUS.ACTIVE })
    public status: string;

    /**
     * Managing associations
     */
    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({ 
        name: 'role_permissions', 
        joinColumn: { name: 'permission_id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[];

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}