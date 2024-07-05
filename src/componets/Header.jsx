import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';


function Header({ }) {
    
    return (
        <>
            <header>
                <ul>
                    REACT
                    <li>
                        <Link to="/"><button className='btn1'>Home</button></Link> 
                    </li>
                    <li>
                        <Link to="/gallery"><button className='btn1'>Create achievement</button></Link> 
                    </li>
                </ul>
            </header>
        </>
    );
}

export default Header;

