import { toast } from 'react-hot-toast'
let logoutTimer;

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
}

export const logoutAndRedirect = (navigate) => {
    clearTimeout(logoutTimer);
    setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
        setTimeout(() => {
            toast.error('Session expired', {
                duration: 4000,
            });
        }, 1000);
    }, 3600000);
}

export const logoutUser = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/');
}
