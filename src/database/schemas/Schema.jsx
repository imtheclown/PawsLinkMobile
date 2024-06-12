import {Realm, ObjectSchema} from "realm";
import { FertilityStatus, Sex, LifeStatus,  } from "../../utils/CustomTypes";
class Animal extends Realm.Object{
    static schema = {
        name: 'Animal',
        properties: {
            _id: 'objectId',
            fertilityStatus: { type: 'string', default: FertilityStatus.FERTILE }, 
            location: { type: 'list', objectType: 'string' },
            mainName: 'string',
            sex: { type: 'string', default: Sex.UNDETERMINED }, 
            status:{ type: 'list', objectType: 'string', default: [LifeStatus.ALIVE] }, 
            coatColor: { type: 'list', objectType: 'string', default: [] },
            imgUrl: 'string',
            notes: { type: 'list', objectType: 'string', default: [] },
            species: 'string',
            traitsAndPersonality: { type: 'list', objectType: 'string', default: [] },
            disabilities: { type: 'list', objectType: 'string', default: [] },
            age: 'int'
        },
        primaryKey : '_id'
    }
}

export {Animal, AnimalSchema}

class AnimalSchema extends Realm.Object{
    static schema = {
        name: 'Animals',
        properties: {
            _id: 'objectId',
            location:{
                type: 'string'
            },
            mainName:{
                type: 'string'
            },
            sex: {
                type: 'string'
            },
            status:{
                type: 'list',
                objectType: 'string'
            },
            coatColor:{
                type: 'list',
                objectType: 'string'
            },
            imgUrl:{
                type: 'string'
            },
            notes:{
                type: 'list',
                objectType: 'string'
            },
            species:{
                type: 'string'
            },
            traitsAndPersonality:{
                type: 'list',
                objectType: 'string'
            },
            disabilities: {
                type: 'list',
                objectType: 'string',
            },
            age: {
                type: 'int'
            },
            sterilizationDate:{
                type: 'date'
            }
        },
        primaryKey : '_id'
    }
}
