import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useState } from "react";
import { auth } from "../services/firebaseConfig";
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
            // const response = await signInWithEmailAndPassword(auth, email, password);
            // setUser(response._tokenResponse);
            // logger.info("Login successful", response);
        } catch (error) {
            logger.error("Login failed:", error.message);
            logger.info('Login error object:', error);
            throw Error(error.message)
        }
        finally {
            setUser({email: "test@test.com"})
        }
    }

    async function register(email, password) {
        logger.log("in function UserProvider.register() with e-mail:", email);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            logger.info("Register successful");
            await login(email, password)
        } catch (error) {
            logger.error("Register failed:", error.message);
            logger.debug('Register error object:', error);
            throw Error(error.message)
        }
    }

    async function logout() {
        logger.log("in function UserProvider.logout() with user:", user.email);
        await signOut(auth);
        setUser(null)
        logger.info("Logout successful");
    }

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
