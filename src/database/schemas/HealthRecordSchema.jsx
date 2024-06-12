import Realm from "realm";
import { EmptyAttributeFiller } from "../../utils/CustomTypes";

class HealthRecordSchema extends Realm.Object{
    static schema = {
        name: 'HealthRecord',
        properties: {
            _id: 'objectId',
            animalId:'objectId',
            // medication is required
            medication: {type: 'object', properties: {
                medicationName: 'string',
                medicationType: 'string',
                brand: 'string'
            }},
            veterinarian: {type: 'string', default: EmptyAttributeFiller.NA},
            clinic: {type: 'string', default: EmptyAttributeFiller.NA},
            dateGiven: {type: 'date'}

        },
        primaryKey :'_id'
    }
}

export default HealthRecordSchema