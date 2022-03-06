
export const tokenExists = () => {
    var token = localStorage.getItem('token')
    if (token != null) return true;
    return false;
}

export const setJWT = (token) => {
    localStorage.setItem('token', JSON.stringify({
        token: token
    }))
}

export const getJWT = () => {
    var token = localStorage.getItem('token')
    return JSON.parse(token);
}

export const sendToLogin = () => {
    this.props.history.push("/login");
}