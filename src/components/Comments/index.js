import React, { PureComponent } from 'react';

export class Comments extends PureComponent {
    render(){
        return(
            <>
                <div className="">
                    <textarea style={{resize: 'none', width: '100%'}} rows="4" cols="40" placeholder="write comment here"/>
                </div>
                <button> Add comment</button>
            </>
        )
    }
}