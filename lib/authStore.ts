export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

let authToken: string | null = null;
let authUser: AuthUser | null = null;

export const setAuth = (token: string, user: AuthUser) => {
    authToken = token;
    authUser = user;
};

export const getAuthToken = () => {
    return authToken;
};

export const getAuthUser = () => {
    return authUser;
};

export const clearAuth = () => {
    authToken = null;
    authUser = null;
};