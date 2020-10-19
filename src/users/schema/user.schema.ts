import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        min: [6, 'Password must be at least 6 characters'],
        max: [20, 'Password must be a maximum of 20 characters']
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: String,
    picture: String,

    google: {
        id: String,
        picture: String,
    },

    facebook: {
        id: String,
        picture: String,
    }
});

export class User extends mongoose.Document {

    email: string;
    password: string;
    firstName: string;
    lastName: string;
    picture: string;

    google: {
        id: string;
        picture: string;
    };

    facebook: {
        id: string;
        picture: string;
    };
}
