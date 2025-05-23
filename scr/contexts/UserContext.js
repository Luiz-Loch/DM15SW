import { createContext, useEffect, useState } from "react";

import { logger } from "../utils/logger";

export const UserContext = createContext()

export function UserProvider({ children }) {
    logger.info('in file: ./scr/context/UserContext.js');
    logger.info('in function: UserProvider');

    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    async function login(email, password) {
        logger.log("in function UserProvider.login() with e-mail:", email);
        try {
            //  Firebase Auth
            //     const userCredential = await auth.signInWithEmailAndPassword(auth, email, password)
            //     const user = userCredential.user
            //     setUser(user)
            // await account.createEmailPasswordSession(email, password)
            // const response = await account.get()
            const response = { id: 'fake-id', email }; // simulação temporária

            setUser(response)
            logger.info("Login successful", response);
        } catch (error) {
            logger.error("Login failed:", error.message);
            logger.debug('Login error object:', error);
            throw Error(error.message)
        }
    }

    async function register(email, password) {
        logger.log("in function UserProvider.register() with e-mail:", email);

        try {
            // Firebase Auth
            //     const userCredential = await auth.createUserWithEmailAndPassword(auth, email, password)
            //     const user = userCredential.user
            // await account.create(ID.unique(), email, password)
            logger.info("Register successful");
            await login(email, password)
        } catch (error) {
            logger.error("Register failed:", error.message);
            logger.debug('Register error object:', error);
            throw Error(error.message)
        }
    }

    async function logout() {
        logger.log("in function UserProvider.logout() with user:", user);

        // await account.deleteSession("current")
        setUser(null)
        logger.info("Logout successful");
    }

    async function getInitialUserValue() {
        logger.log("in function UserProvider.getInicialUserValue()");

        try {
            // const res = await account.get()
            logger.info("User session found on load:", res);
            setUser(res)
        } catch (error) {
            setUser(null)
            logger.warn("No user session found on load");
        } finally {
            setAuthChecked(true)
            logger.log("Auth check completed");
        }
    }

    useEffect(() => {
        logger.log("UserProvider mounted, checking auth...");
        getInitialUserValue()
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout,
            register,
            authChecked
        }}>
            {children}
        </UserContext.Provider>
    );
}
