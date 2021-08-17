import React, {useEffect, useState} from 'react'
import firebase from 'firebase'

const Login = ({ updateAuth }) => {
    
    const [value, setValue] = useState('')
    const [data, readData] = useState(null)
    const [new1, setNew1] = useState('')
    const [new2, setNew2] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        const getPassword = async () => {
            const password = await firebase.firestore().collection('Admin').doc('password').get()
            return password.data().value
        }
        getPassword().then(response => {
            readData(response)
        })
    }, [])
    

    const onSubmit = () => {

        if (value === data) {
            updateAuth(true)
        } else {
            setError(true)
            setValue('')
            console.log(data)
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

    if (data) {
        return (
            <div>
                <input type='text'
                       onChange={handleInputChange}
                       value={value} />
                <button onClick={onSubmit}>submit</button>
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
                <button onClick={createPassword}>submit</button>
                {error ? (<p>ope... there must be a typo.</p>) : <p>please create your password</p>}
            </div>
        )
    }
    

}

export default Login