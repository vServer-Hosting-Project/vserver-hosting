import React, {createContext, useState} from "react";
import Pool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const Account = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();  
      }
    });
  };

  const authenticate = async (Username, Password) => {
    const user = new CognitoUser({ Username, Pool });
    return await new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('authentication successful', data);
          setIsLoggedIn(true); // Benutzer ist eingeloggt
          resolve(data);
        },
        onFailure: (err) => {
          console.error('authentication failed', err);
          setIsLoggedIn(false); // Benutzer ist nicht eingeloggt
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          setIsLoggedIn(false); // Benutzer ist nicht eingeloggt
          resolve(data);
        }
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsLoggedIn(false); // Benutzer ist abgemeldet
      console.log('logout successful');
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout, isLoggedIn }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
