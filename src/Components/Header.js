import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to='/serenity-in-soap'>Serenity in Soap</Link>
            <Link to='/serenity-in-healing'>Serenity in Healing</Link>
            <Link to='/contact-me'>Contact Me</Link>
            <Link to='/about-me'>About Me</Link>
        </div>
    )
}

export default Header