import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    const { data: user, error, mutate: userMutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .catch(error => {
                if (error.response.status !== 409) throw error;

                router.push('/verify-email');
            })
    );
    const isAdmin = user?.roles.includes('Admin') ? true : false;

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setIsLoading, setErrors, ...props }) => {
        await csrf();

        setErrors([]);
        setIsLoading(true);
        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const login = async ({ setIsLoading, setErrors, setStatus, ...props }) => {
        await csrf();
        setIsLoading(true);
        setErrors([]);
        setStatus(null);

        axios
            .post('/login', props)
            .then(() => userMutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            }).finally(() => {
                setIsLoading(false);
            });
    };



    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => userMutate());
        }

        window.location.pathname = '/login';
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated);
        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
        user,
        isAdmin,
        userMutate,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
};
