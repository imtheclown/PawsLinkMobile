import Realm, { Collection } from "realm";

class ForumEntry extends Realm.Object{
    static schema = {
        name: 'ForumEntry',
        properties: {
            _id: {
                type: 'objectId',
                indexed:true
            },
            username: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            entryImageURL: {
                type: 'string',
                default: ''
            },
            datePosted: {
                type: 'date',
            },
            commentNum:{
                type: 'int'
            },
            content:{
                type: 'string'
            }
        },
        primaryKey : "_id",

    }
}

export {ForumEntry}