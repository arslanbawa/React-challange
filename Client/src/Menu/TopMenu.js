import React, { useEffect, useState } from 'react'
import logohere from '../Images/logohere.png'
import Users from '../Components/Users'
import { useQuery, gql, NetworkStatus } from '@apollo/client';

const ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;





function TopMenu(){
    
    const [usersDefault, setUsersDefault] = useState()
    const [users, setUsers] = useState()

       const [keyWord, setKeyWord]= useState('')
      function handleSearchInput(e) {
        if(e.target.value){
            const filtered = usersDefault.getAllUsers.filter(u => {
                return u.firstName.toLowerCase().includes(e.target.value)|| u.lastName.toLowerCase().includes(e.target.value)
            })
            setKeyWord(e.target.value);
            setUsers({getAllUsers:filtered});
        }else{
            setUsers(usersDefault);
        }
        //console.log(input.target.value)
      } 
      let {loading, fetchMore, networkStatus } = useQuery(ALL_USERS)
    useEffect(async function(){
        
        const {data, error} = await fetchMore({
            variables: {
                fetchPolicy: "cache-and-network"
            }
          });
          loading = false;
       
    if (networkStatus === NetworkStatus['refetch'])
        return 'Refetching!';
    else if (loading)
        return 'Loading..';
    else if (error)
        return `Error! ${error}`;
    else if (data){
        setUsersDefault(data)
        setUsers(data)
        console.log(data)
    }
    } ,[])

    return (
        <>
        <div className="top-menu is-shadow-2">
            <div className="menu-logo-container">
                <img className="menu-logo" src={logohere} alt="Logo" />
            </div>
            <div>
                <input
                    className="search-field"
                    placeholder="Search here...."
                    type="search"
                    name="name"
                    
                    autoComplete="off"
                     onChange={handleSearchInput}
                />
            </div>
            
        </div>
        { users && <Users data={users}/> }
        
      </>  
    );
}

export default TopMenu;