import React, {useEffect, useState} from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    // const NO = [];
    const USERS = [{ id: 'u1', name: 'Real Madrid', image: 'https://as1.ftcdn.net/v2/jpg/07/90/16/84/1000_F_790168418_apmbVVMxZ2SldzYfq1XfzwoVOicxZOmN.jpg', places: 15 },
        { id: 'u2', name: 'Manchester United', image: 'https://as1.ftcdn.net/v2/jpg/04/61/80/04/1000_F_461800483_Xgj7cWtNcayprLuQlt17aaIRHxJz54GH.jpg', places: 3 }
    ];
    //const [isLoginMode, setIsLoginMode] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, error, sendRequest} = useHttpClient();
    console.log(isLoading, error, sendRequest);
    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest('http://127.0.0.1:8000/api/users/');
                setLoadedUsers(responseData.users);
                
            } catch(err) {
            }
            
        };
        fetchUsers();
    },[sendRequest]);

    return <React.Fragment>
        <ErrorModal error={error} onClear={true}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner/>
            </div>
        )}
        {!isLoading && loadedUsers &&<UserList items={loadedUsers} />}
    </React.Fragment>;
}

export default Users; 