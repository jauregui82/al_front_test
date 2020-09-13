import React from 'react';

export const Layout = ({children}) =>{
    return(
        <div style={{position: 'relative'}}>
            <header style={{height: '4rem', backgroundColor: '#cacacaca', position: 'absolute', width: '100%', zIndex: 1}}> header</header>
            <main style={{height: '100vh', overflow: 'auto'}}>
                <div  style={{padding: '1rem 2rem', margin: '4rem 0', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>{children}</div>
            </main>
            <footer style={{bottom: 0, height: '4rem', position: 'absolute',  backgroundColor: '#cacacaca', width: '100%'}}>footer</footer>
        </div>
    )
}