import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './style.scss'
import moment from 'moment';

const randomDate = (start, end) => {
    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).format("DD-MM-YYYY")
}
const location = (id) => ({
  pathname: `/detail-post/${id}`,
  state: { fromDashboard: true }})

export class CardPost extends PureComponent {
    render(){
        const {body, comments, id, title} = this.props
        return(
            <div className="wrapper">
                <div className="blog-post">
                    <div className="container-copy">
                        <div className="content-date-comments">
                            <h3>{randomDate(new Date(2012, 0, 1), new Date())}</h3>
                            <div className="constent-comments">
                                <div className="comments"/><h3>{`${comments} comments`}</h3></div>
                        </div>
                        <h1>{title}</h1>
                        <p>{body}</p>
                    </div>
                    <Link className="btn-primary" to={location(id)} >Read More</Link>
                </div>
            </div>
        )
    }
}