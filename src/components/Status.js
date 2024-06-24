import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession, isLoggedIn } = useContext(AccountContext);

    useEffect(() => {
        if (isLoggedIn) { // Wenn der Benutzer eingeloggt ist
            getSession() // Ruft die aktuelle Sitzung ab
            .then(session => {
                console.log("Session", session); // Loggt die Sitzungsdaten
                setStatus(true); // Setzt den Status auf true
            })
            .catch(err => {
                console.error("Failed to get session", err); // Loggt den Fehler, wenn das Abrufen der Sitzung fehlschlägt
                setStatus(false); // Setzt den Status auf false
            });
        } else { // Wenn der Benutzer nicht eingeloggt ist
            setStatus(false); // Setzt den Status auf false
        }
    }, [isLoggedIn]) // Fügt isLoggedIn als Abhängigkeit hinzu, um den Effekt erneut auszuführen, wenn sich der Zustand ändert ändert
};

export default Status;
