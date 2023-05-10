
export const setToken = (newToken:string) => {
    localStorage.setItem('token', JSON.stringify(newToken));
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
}
