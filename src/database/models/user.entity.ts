import { hash } from 'bcrypt';

import { Role } from './role.entity';
import { Setting } from './setting.entity';
import { STATUS } from 'src/utils/constants';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BeforeUpdate, Unique } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', name: 'username', default: null })
    public username: string;

    @Column({ type: 'varchar', name: 'email', nullable: false })
    public email: string;

    @Column({ type: 'varchar', name: 'country_code', default: null })
    public countryCode: string;

    @Column({ type: 'varchar', name: 'phone_number', default: null })
    public phoneNumber: string;

    @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
    public password: string;

    @Column({ type: 'varchar', name: 'first_name', default: null })
    public firstName: string;

    @Column({ type: 'varchar', name: 'last_name', default: null })
    public lastName: string;

    @Column({ type: 'varchar', name: 'middle_name', default: null })
    public middleName: string;

    @Column({ type: 'varchar', name: 'bio', default: null })
    public bio: string;

    @Column({ type: 'varchar', name: 'gender', default: null })
    public gender: string;

    @Column({ type: 'bool', name: 'is_email_verified', default: true, select: false })
    public isEmailVerified: boolean;

    @Column({ type: 'varchar', name: 'status', default: STATUS.USER.ACTIVE })
    public status: string;

    @Column({ type: 'varchar', name: 'social_account_id', default: null, select: false })
    public socialAccountId: string;

    @Column({ type: 'int', name: 'role_id', default: null })
    public roleId: number;

    @Column({ type: 'int', name: 'account_id', default: null, select: false })
    public accountId: number;

    @Column({ type: 'int', name: 'profile_image_id', default: null })
    public profileImageId: number;

    /**
     * Managing associations
     */
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    public role: Role;

    /**
     * Handling functions
     */
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}

@Entity({ name: 'user_settings' })
export class UserSetting {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    public userId: number;

    @Column({ type: 'int', name: 'setting_id', nullable: false })
    public settingId: number;

    @Column({ type: 'boolean', name: 'enabled', default: true })
    public enabled: boolean;

    /**
     * Managing associations
     */
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @ManyToOne(() => Setting)
    @JoinColumn({ name: 'setting_id' })
    public setting: Setting;

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}

@Entity({ name: 'tokens' })
@Unique('token_type', ['email', 'type'])
export class Token {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', name: 'email', default: null })
    public email: string;

    @Column({ type: 'text', name: 'token', nullable: false })
    public token: string;
    
    @Column({ type: 'varchar', name: 'code', nullable: false })
    public code: string;

    @Column({ type: 'varchar', name: 'type', nullable: false })
    public type: string;

    @Column({ type: 'varchar', name: 'status', default: STATUS.ACTIVE })
    public status: string;

    /**
     * Adding Create & Update Date Columns
     */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date;
}