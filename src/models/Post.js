import { gql } from "@apollo/client";

const GET_ALL_POST = gql`
    query ($options: PageQueryOptions) {
        posts(options: $options) {
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
`;
const GET_POST = gql`
    query ($id: ID!){
        post(id: $id) {
            id
            title
            body
        }
    }
`;

// const GET_PAYER_REPRESENTATIVES = gql`
//   query representativesOfPayerCompany($enterprise_id: Int!) {
//     representativesOfPayerCompany(enterprise_id: $enterprise_id) {
//       relation_id
//       can_edit
//       representative {
//         user
//         user_data {
//           first_name
//           last_name
//           is_active
//         }
//         document_number
//       }
//     }
//   }
// `;

export {GET_ALL_POST, GET_POST}