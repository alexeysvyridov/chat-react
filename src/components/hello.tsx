import React, { useState, useEffect } from 'react'

export const Hello = () => {
    const [initialState, setInitialState] = useState([])
    useEffect(() => {
        fetch('/api/')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonResp => {
                console.log(jsonResp);
                setInitialState(jsonResp)
            })
    }, [])
    return (
        <div>
            hello
        </div>
    )
}
