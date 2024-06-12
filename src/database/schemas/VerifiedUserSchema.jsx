import Realm from "realm";

class VerifiedUserSchema extends Realm.Object{
    static schema = {
        name: 'VerifiedUser',
        properties:{
            _id: 'objectIid',
            userID_FK: 'objectId',
            firstName: 'string',
            lastName: 'string',
            emailAddress: 'string',
            completeCurrentAdd: 'string',
            age: 'number',
            student: 'bool',
            faceBookLink: 'string'
        }
    }
}
export default VerifiedUserSchema;
