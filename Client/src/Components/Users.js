import React from 'react';
import UserCard from './UserCard'


function Users({data}){

    //Passing query to useQuery hook to fetch data

        return(
            <>
            { data && <div className="is-scrollable-list">
                {data ? data.getAllUsers.map((item) => (
                    <UserCard
                        key={item.id}
                        item={item}
                    />
                )) : 'Users list undefined...' }
            </div> }
            </>
        )
}

export default Users;