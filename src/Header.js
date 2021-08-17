import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to='/booking'>Book a Session</Link>
            <Link to='/contact-me'>Contact Me</Link>
            <Link to='/about-me'>About Me</Link>
        </div>
    )
}

export default Header