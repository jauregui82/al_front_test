import React, { Component } from 'react';
import { gql } from '@apollo/client';
import client from '../../config/apollo';
import { Layout } from '../../components/Layout';
 
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
       const paginate={page:2, limit:8}
        client.query({ query: gql`
            {
                posts(options: {paginate:{page:${paginate.page}, limit:${paginate.limit}}}) {
                    data {
                    id
                    title
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
                            return(<div key={item.id}>{item.id} - {item.title}</div>)
                            })
                        )
                    } 
                </Layout>
            </>
        )
    }
}

export default Home;