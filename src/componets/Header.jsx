import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';


function Header({ }) {
    
    return (
        <>
            <header>
                <div className='container_header'>
                    <div className='container_nav'>
                            <Link to="/"><button className='btn1'>Home</button></Link> 
                        
                        
                            <Link to="/gallery"><button className='btn1'>Create achievement</button></Link> 
                        
                        
                            <Link to="/users"><button className='btn1'>Users</button></Link> 
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;

