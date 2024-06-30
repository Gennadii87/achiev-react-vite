import React from 'react';
import '../style/Header.css';

function Header({ }) {
    
    return (
        <div>
            <header>
                <ul>
                    REACT
                    <li>
                        <button className='btn1'>home</button>
                    </li>
                    <li>
                        <button className='btn1'>users</button>
                    </li>
                    <li>
                        <button className='btn1'>shop</button>
                    </li>
                    <li>
                        <button className='btn1'>button4</button>
                    </li>
                    <li>
                        <button className='btn1'>button5</button>
                    </li>
                </ul>
            </header>
        </div>
    );
}

export default Header;

