import React from 'react';


function getUserList(props){
    const {list}=props;
    return(
        <ul>
            {
                list.map(post=>
                    <li>{post.name}</li>)
            }
        </ul>
    )
}
