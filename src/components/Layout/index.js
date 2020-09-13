import React from 'react';

export const Layout = ({children}) =>{
    return(
        <>
            <header style={{padding: '2rem', backgroundColor: '#cacacaca'}}> header</header>
            <main style={{padding: '1rem 2rem'}}>{children}</main>
            <footer style={{bottom: 0, padding: '2rem', position: 'absolute',  backgroundColor: '#cacacaca', width: '100%'}}>footer</footer>
        </>
    )
}