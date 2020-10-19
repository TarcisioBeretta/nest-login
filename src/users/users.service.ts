import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    async getById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async getByGoogleId(googleId: string): Promise<User> {
        return await this.userModel.findOne({ 'google.id': googleId }).exec();
    }

    async getByFacebookId(facebookId: string): Promise<User> {
        return await this.userModel.findOne({ 'facebook.id': facebookId }).exec();
    }

    async create(user: User): Promise<User> {
        return await new this.userModel(user).save()
    }

    async update(id: string, user: User): Promise<User> {
        await this.userModel.updateOne({ _id: id }, user).exec();
        return await this.getById(id);
    }

    async delete(id: string): Promise<void> {
        await this.userModel.deleteOne({ _id: id }).exec();
    }
}
