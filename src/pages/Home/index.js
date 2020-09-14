import React, { Component } from 'react';
import { gql } from '@apollo/client';
import client from '../../config/apollo';
import { Layout } from '../../components/Layout';
import { CardPost } from '../../components/CardPost';
 
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            initialData:[],
            loading: false
        }
    }
   componentDidMount(){
    this.setData();
   }

   setData=()=>{
        this.setState({loading:true})
       const paginate={page:1, limit:6}
        client.query({ query: gql`
            {
                posts(options: {paginate:{page:${paginate.page}, limit:${paginate.limit}}}) {
                    data {
                    id
                    title
                    body
                    }
                    meta {
                    totalCount
                    }
                }
            }
        `})
        .then(result => {
            this.setState({initialData: result.data}, ()=> {
                this.setState({loading:false})
            })
            console.log(result.data);
        });

   }
    render(){
        const {initialData, loading } = this.state;
        return(
            <>
                <Layout>
                    {loading ? 
                        (
                            <p>cargando...</p>
                        ): (
                            initialData?.posts?.data.map((item)=>{
                            return(
                                <CardPost key={item.id} id={item.id} title={item.title} body={item.body} />
                                )
                            })
                        )
                    } 
                </Layout>
            </>
        )
    }
}

export default Home;