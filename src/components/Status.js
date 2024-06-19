import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession, isLoggedIn } = useContext(AccountContext);

    useEffect(() => {
        if (isLoggedIn) {
            getSession()
            .then(session => {
                console.log("Session", session);
                setStatus(true);
            })
            .catch(err => {
                console.error("Failed to get session", err);
                setStatus(false);
            });
        } else {
            setStatus(false);
        }
    }, [isLoggedIn]) // Fügen Sie isLoggedIn als Abhängigkeit hinzu
};

export default Status;
