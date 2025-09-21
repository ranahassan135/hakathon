import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuth: true, user: payload.user };
        case "SET_LOGGED_OUT":
            return initialState
        // case "UPDATE_PROFILE":
        //     return { ...state, user: { ...state.user, ...payload.updatedData } }
        default:
            return state;
    }
}
const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const readProfile = useCallback(async () => {
        const token = localStorage.getItem("jwt")
        const config = { headers: { Authorization: `Bearer ${token}` } }

        axios.get(`http://localhost:8000/auth/user`, config)
            .then(({ status, data }) => {
                if (status == 200) {
                    window.notify(data.message, "success")
                    console.log('data', data)
                    const user = data.user
                    dispatch({ type: "SET_LOGGED_IN", payload: { user } })
                }
            })
            .catch((error) => {
                window.notify(error, "error")
                window.notify("Something went wrong while fetching the users", "error")
            })
            .finally(() => {
            })


    }, [dispatch])
    useEffect(() => {
        readProfile()
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

