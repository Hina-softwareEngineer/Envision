import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Authentication {
  constructor() {}
  /**
   * @description Login with Email and Password
   * @param {string} email
   * @param {string} password
   */
  async onRegisterWithEmailAndPassword(username, email, phone, password, role) {
    console.log(email, phone, password, username);
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        console.log('User account created & signed in!', res);

        let data = {
          username,
          email,
          phone,
          role,
        };

        await database()
          .ref(`/users/${res.user.uid}`)
          .set({
            ...data,
          });
        return 'success';
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          return 'That email address is already in use!';
        }

        if (error.code === 'auth/invalid-email') {
          return 'That email address is invalid!';
        }
        if (error.code === 'auth/weak-password') {
          return 'That email address is invalid!';
        }
        console.log('error', error);
        return 'Error while creating your account';
      });
  }

  /**
   * @description Login with Email and Password
   * @param {string} email
   * @param {string} password
   */
  async onLogInWithEmailAndPassword(email, password) {
    console.log(email, password, '----');
    return await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // console.log('User account created & signed in!', res);
        return 'success';
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          return 'That email address is invalid!';
        }

        if (error.code === 'auth/user-not-found') {
          return 'User not found!';
        }
        if (error.code === 'auth/wrong-password') {
          return 'Incorrect Password';
        }

        return 'Invalid Email or Password.';
      });
  }

  /**
   * @description User Authentication Status
   * @returns {object} response may be object or null
   */
  async checkUserAuthenticationStatus(callBack) {
    auth().onAuthStateChanged(callBack);
  }

  /**
   * @description User Authentication Status
   * @returns {object} response may be object or null
   */
  async getUserAuthDetailFromDB(user_id = '') {
    let response = await database()
      .ref('/users')
      .orderByKey()
      .equalTo(user_id)
      .once('value')
      .then(res => res.val())
      .catch(err => err);
    return response;
  }

  /**
   * @description Logout User
   */
  async onUserLogout() {
    return await auth().signOut();
  }
}

export const authenticationUI = new Authentication();
