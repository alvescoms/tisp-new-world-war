import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from 'next/router';

import { showTurkeyValidation } from '../utils/alert';

import api from '../api/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const router = useRouter()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStorageData = async () => {

            const storagedToken = localStorage.getItem('TISP@NewWorldWar#Token')
            const storagedUser = localStorage.getItem('TISP@NewWorldWar#User')
          
            if (storagedUser) {

                setUser(JSON.parse(storagedUser))

            }

            if (storagedToken) {

                setToken(storagedToken)

            }
    
            setLoading(false)

        }

        const checkLogin = () => {

            const storagedToken = localStorage.getItem('TISP@NewWorldWar#Token')

            if (!storagedToken) {

                router.push('/')

            }

        }
    
        loadStorageData()
        checkLogin()

    }, []);

    const signIn = async (email, password) => {

        setLoading(true)

        const response = await api.post('/users/login', {}, {
            headers: {
                'Authorization': 'Basic ' + btoa(email + ':' + password)
            }
        })

        setLoading(false)

        if (response.data.success) {

            localStorage.setItem("TISP@NewWorldWar#Token", response.data.token)
            localStorage.setItem("TISP@NewWorldWar#User", JSON.stringify(response.data.user))

            router.push('/chars')

        }
        else {

            showTurkeyValidation({
                text: response.data.message
            })

        }

    }
    
    const signOut = async () =>  {
        
        localStorage.clear()
        setUser(null)

    }

    return (

        <AuthContext.Provider value={{ signed: !!token, token, user, loading, signIn, signOut }}>
            {children}  
        </AuthContext.Provider>

    )

};

const useAuth = () => {

    const context = useContext(AuthContext)
  
    if (!context) {

        throw new Error('useAuth must be used within an AuthProvider.');

    }
  
    return context;

}
  

export {
    AuthProvider,
    useAuth
};