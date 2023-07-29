import { STATUS } from "src/utils/constants";
import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity({ name: 'attachments' })
export class Attachment {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', name: 'path', nullable: false })
    public path: string;

    @Column({ type: 'varchar', name: 'extension', nullable: false })
    public extension: string;

    @Column({ type: 'bigint', name: 'size', default: null, comment: 'Size in Bytes' })
    public size: number;

    @Column({ type: 'varchar', name: 'unique_name', default: null })
    public uniqueName: string;

    @Column({ type: 'varchar', name: 'original_name', default: null })
    public originalName: string;

    @Column({ type: 'bool', name: 'in_use', default: false })
    public inUse: boolean;

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}