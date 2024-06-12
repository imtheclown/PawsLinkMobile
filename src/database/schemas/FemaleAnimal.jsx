import {Realm, ObjectSchema} from "realm";
import { FemaleAnimalStatus } from "../../utils/CustomTypes";

class FemaleAnimalSchema extends Realm.Object{
    static schema = {
        name : 'FemaleAnimal',
        properties:{
            // required
            _id : 'objectId',
            animalId: 'objectId',
            // optional
            children: {type: 'list', objectType: 'objectId', default: []},
            numPregnancies : {type: 'number', default: 0},
            status: {type: 'string', default: FemaleAnimal.NORMAL}
        },
        primaryKey: '_id'
    }
}

export default FemaleAnimalSchema