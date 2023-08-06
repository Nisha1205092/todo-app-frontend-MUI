import { useState, useEffect } from 'react';

const initialValue = {
    email: '',
    uid: ''
}

const useAuth = () => {
    const [user, setUser] = useState(initialValue);

    useEffect(() => {
        console.log('inside useEffect of useAuth hook')
        // Check localStorage when the component mounts
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.stringify(storedUser));
        }
    }, []);

    const login = (userData) => {
        // Save user data to localStorage when logging in
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        // Clear user data from localStorage when logging out
        localStorage.removeItem('user');
        setUser(initialValue);
    };

    return [
        user,
        login,
        logout
    ];
};

export default useAuth;
