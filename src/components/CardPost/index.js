import React, { PureComponent } from 'react';
import './style.css'
import moment from 'moment';

const randomDate = (start, end) => {
    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).format("DD-MM-YYYY")
}
export class CardPost extends PureComponent {
    render(){
        const {body, id, title} = this.props
        return(
            <div className="wrapper">
                <div className="blog_post">
                    <div className="container_copy">
                        <h3>{randomDate(new Date(2012, 0, 1), new Date())}</h3>
                        <h1>{title}</h1>
                        <p>{body}</p>
                    </div>
                    <button className="btn_primary" onClick={()=> console.log(id)} >Read More</button>
                </div>
            </div>
        )
    }
}