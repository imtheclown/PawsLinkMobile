import Realm from "realm";
class AdoptionFormSchema extends Realm.Object{
    static schema = {
        name: 'AdoptionForm',
        properties: {
        fname: 'string',
        lname: 'string',
        age: 'int',
        isStudent: 'bool',
        contactNumber: 'string',
        emailAdd: 'string',
        faceBookLink: 'string',
        completeHomeAddress: 'string',
        currentHomeAddress: 'string',
        noOfPets: 'int',
        yearsOfBeingPetOwner: 'int',
        ageOfOldestLivingPet: 'int',
        adoptedPetFutureAddress: 'string',
        neuterOrSpayAwareness: 'string',
        neuterOrSpayWillingness: 'bool',
        regularVetClinic: 'string',
        inDoorOrOutdoor: 'string',
        leashOrCaged: 'string',
        basicNecessities: { type: 'list', objectType: 'string' },
        enrichmentActivity: 'string',
        hearAboutUs: 'string',
        idPhotoUrl: 'string',
        animalId: 'objectId',
        userId: 'objectId',
        status: 'string',
        },
        primaryKey: 'userId',
    }
}

export default AdoptionFormSchema