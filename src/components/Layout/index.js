import React from 'react';
import './style.scss'

export const Layout = ({children, handleAddNewPost}) =>{
    return(
        <div style={{position: 'relative'}}>
            <header>
                {handleAddNewPost &&(
                    <div>
                        <button onClick={handleAddNewPost}> Add new post</button>
                        <span>post length</span>
                    </div>
                )}
            </header>
            <main>
                <div className={"contentCard"}>{children}</div>
            </main>
            <footer>footer</footer>
        </div>
    )
}