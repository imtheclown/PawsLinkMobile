import Realm from "realm";
class UpdateDateSchema extends Realm.Object{
    static schema = {
        name: 'UpdateDate',
        properties:{
            _id: {
                type: 'objectId'
            },
            lastUpdateDate: {
                type: 'date'
            },
            lastUpdateId:{
                type: 'objectId'
            }
        },
        primaryKey: '_id'
    }
}
export default UpdateDateSchema