import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getUserByFirebaseId } from '../api/userApi';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const response = await getUserByFirebaseId(currentUser.uid);
                    const userData = response;
                    setIsAdmin(userData.role === 'admin');
                    console.log('Is admin:', userData.role === 'admin');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

        if (loading) return <div className="text-center text-gray-200 py-20"><LoadingSpinner /></div>

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;