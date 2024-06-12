import * as React from "react";
import Realm from "realm";
import NavigationWrapper from "./src/components/Navigation";

const App = () => {
  Realm.copyBundledRealmFiles()
  return (
    <NavigationWrapper/>
  );
};
export default App;

