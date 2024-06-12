import { ForumEntry } from "../schemas/ForumEntry";
import { createRealmContext, useApp } from "@realm/react";


export const {
    RealmProvider: ForumRealmProvider,
    useRealm: useForumRealmProvider
  } = createRealmContext({
    schema: [ForumEntry],
    sync:{
        flexible: true,
        onError: (_session, error) => {
          console.log(error);
        },
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects(ForumEntry));
          },
        },
    },
    path: "ForumEntrySynced.realm",
});