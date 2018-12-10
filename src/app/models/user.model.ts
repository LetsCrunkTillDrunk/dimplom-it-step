import * as firebase from 'firebase/app';

export class User {
  userId: string;
  displayName: string;
  email: string;
  idToken?: string;
  roles: any[];

  constructor(authState?: firebase.User) 
  {
    if (authState) {
      this.userId = authState.uid;
      this.email = authState.providerData[0].email;
      this.displayName = (authState.providerData[0].displayName ? authState.providerData[0].displayName : this.email);
    }
  }
}