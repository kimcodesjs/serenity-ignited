import React, {useEffect, useState} from 'react'
import firebase from 'firebase'

const Login = ({ updateAuth }) => {
    
    const [value, setValue] = useState('')
    const [password, readPassword] = useState(null)
    const [new1, setNew1] = useState('')
    const [new2, setNew2] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        firebase.firestore().collection('Admin').doc('password').get().then((doc) => {
            if (doc.exists) {
                readPassword(doc.data().value)
            }
        })
        
    })
    

    const onSubmit = () => {
        if (value === password) {
            updateAuth(true)
        } else {
            setError(true)
            setValue('')
        }
    }

    const createPassword = () => {
        
        if (new1 === new2) {
            firebase.firestore().collection('Admin').doc('password').set({
                value: new1
            })
            .then(() => {
                updateAuth(true)
            })
        } else {
            setNew1('')
            setNew2('')
            setError(true)

        }
    }

    const onChange1 = (event) => {
        setNew1(event.target.value)
    }

    const onChange2 = (event) => {
        setNew2(event.target.value)
    }

    const handleInputChange = (event) => {
        setValue(event.target.value)
    }

    if (password) {
        return (
            <div>
                <input type='text'
                       onChange={handleInputChange}
                       value={value} />
                <button onClick={onSubmit}/>
                {error ? (<p>ope... there must be a typo.</p>) : <p>please enter your password</p>}
            </div>
        ) 
    } else {
        return (
            <div>
                <input type='text'
                       onChange={onChange1} 
                       value={new1} />
                <input type='text'
                       onChange={onChange2} 
                       value={new2}/>
                <button onClick={createPassword} />
                {error ? (<p>ope... there must be a typo.</p>) : <p>please create your password</p>}
            </div>
        )
    }
    

}

export default Login