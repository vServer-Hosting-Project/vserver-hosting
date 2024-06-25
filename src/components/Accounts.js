import React, {createContext, useState} from "react";
import Pool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// Erstellen eines Kontexts für das Benutzerkonto

const AccountContext = createContext();

// Hauptkomponente für das Benutzerkonto

const Account = (props) => {
  
  // Zustand für den Anmeldestatus des Benutzers

  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('idToken') ? true : false )

  // Funktion, um die aktuelle Sitzung zu erhalten

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


      // Funktion, um den Benutzer zu authentifizieren

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('authentication successful', data);
          setIsLoggedIn(true); // Benutzer ist eingeloggt

          //Tokens extrahieren
          const idToken = data.getIdToken().getJwtToken();
          const accessToken = data.getAccessToken().getJwtToken();
          const refreshToken = data.getRefreshToken().getToken();

          //Tokens im lokalen Speicher speichern
          sessionStorage.setItem('idToken', idToken);
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          // Benutzername im sessionStorage speichern
          sessionStorage.setItem('username', Username);

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
  
  
  // Funktion, um den Benutzer abzumelden

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsLoggedIn(false); // Benutzer ist abgemeldet
      console.log('logout successful');

      //Tokens aus dem lokalen Speicher entfernen
      sessionStorage.removeItem('idToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    }
  };

  // Funktion, um die Registrierung des Benutzers zu bestätigen

  const confirm = async (code) => {
    console.log('confirm function in Account.js is called with code:', code);

    // Abrufen des Benutzernamens aus dem sessionStorage
    const username = sessionStorage.getItem('username');

    // Erstellen eines neuen CognitoUser-Objekts mit dem abgerufenen Benutzernamen
    const user = new CognitoUser({ Username: username, Pool });

    if (user) {
      return await new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, function(err, result) {
          if (err) {
            console.error('Error during confirmation', err);
            reject(err);
          } else {
            console.log('confirmation successful', result);
            resolve(result);
          }
        });
      });
    } else {
      console.error('No user found');
    }
  };

  // Rückgabe der Account-Komponente mit dem bereitgestellten Kontext

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout, isLoggedIn, confirm }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
