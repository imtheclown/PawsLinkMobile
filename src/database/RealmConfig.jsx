// realm app id
// used to connect to realm
let APP_ID = '';

const realmAccessBehavior = {
    type: 'downloadBeforeOpen',
    timeOutBehavior: 'openLocalRealm',
    timeOut: 1000,
  };

export {
    APP_ID,
    realmAccessBehavior
}