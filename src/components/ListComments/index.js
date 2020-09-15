import React, { PureComponent } from 'react';

export class ListComments extends PureComponent {
    render(){
        const {comments, deleteComment} = this.props
        return(
            <>
                <ul style={{padding: 0, listStyle: 'none'}}>
                    {comments?.map((item)=>{
                        return(
                        <li key={item.id} style={{paddingBottom: '1rem'}}>
                            <div style={{display: 'flex'}}>
                                <button style={{marginRight: '1rem'}} onClick={()=>deleteComment(item.id)}>x</button>
                                <div>
                                    {item.body}- {item.email}
                                </div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}