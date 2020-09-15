import React from 'react';
import './style.scss'

export const Layout = ({children}) =>{
    return(
        <div style={{position: 'relative'}}>
            <header> header</header>
            <main>
                <div className={"contentCard"}>{children}</div>
            </main>
            <footer>footer</footer>
        </div>
    )
}