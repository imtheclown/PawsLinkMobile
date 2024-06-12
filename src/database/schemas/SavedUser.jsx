import {Realm, ObjectSchema} from "realm";

class SavedUser extends Realm.Object{
    static schema = {
        name: 'SavedUser',
        properties: {
            remembered: 'bool',
            username: 'string',
            email: 'string',
            appPassword: 'string',
            realmPassword: 'string'

        },
        primaryKey: 'email'
    }
}

export {SavedUser}