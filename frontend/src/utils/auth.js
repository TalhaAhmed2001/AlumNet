const login = async (token, user_id) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user_role', user_id)
}

const logout = async () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_role');
}

const isLoggedIn = async () => {
    const token = localStorage.getItem('jwt')
    if (token) {
        return true;
    }
    return false;
}

module.exports = {
    login,
    logout,
    isLoggedIn
}