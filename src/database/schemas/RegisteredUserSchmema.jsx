import Realm from "realm";

class RegisteredUser extends Realm.Object{
    static schema = {
        name:'RegisteredUser',
        properties: {
            _id: 'objectId',
            email: 'string',
            phoneNumber: 'string',
            password: 'string',
            userName: 'string',
            profilePicture: 'string'
        },
        primaryKey: '_id'
    }
}