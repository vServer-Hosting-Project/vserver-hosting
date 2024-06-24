import React, {createContext, useState} from "react";
import Pool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// Erstellen Sie einen Kontext für das Konto
const AccountContext = createContext();

const Account = (props) => {
  // Zustand für die Überprüfung, ob der Benutzer eingeloggt ist
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('idToken') ? true : false )

  // Funktion, um die aktuelle Sitzung abzurufen
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

  // Funktion zur Authentifizierung des Benutzers
  const authenticate = async (Username, Password) => {
    const user = new CognitoUser({ Username, Pool });
    return await new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('authentication successful', data);
          setIsLoggedIn(true); // Benutzer ist eingeloggt

          // Extrahieren der Tokens
          const idToken = data.getIdToken().getJwtToken();
          const accessToken = data.getAccessToken().getJwtToken();
          const refreshToken = data.getRefreshToken().getToken();

          // Speichern der Tokens
          sessionStorage.setItem('idToken', idToken);
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

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

  // Funktion zur Überprüfung des Bestätigungscode
  const confirm = async (code) => {
    const Username = sessionStorage.getItem('username'); // Abrufen des Benutzernamens aus dem sessionStorage
    const user = new CognitoUser({ Username, Pool });
    return await new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  };

  // Funktion zum Abmelden des Benutzers
  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsLoggedIn(false); // Benutzer ist ausgeloggt
      console.log('logout successful');

      // Entfernen der Tokens aus dem Speicher
      sessionStorage.removeItem('idToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    }
  };

  // Bereitstellen der Funktionen und des Zustands über den Kontext
  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout, isLoggedIn, confirm }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
