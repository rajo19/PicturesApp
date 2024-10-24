import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const DUMMY_PLACES = [
    {
        id:'p1', 
        title: 'Santiago Bernabeau', 
        describe: 'Real Madrid Stadium', 
        imageUrl: 'https://as1.ftcdn.net/v2/jpg/03/05/73/26/1000_F_305732618_dcgJSWQCNJm12JlFqigx1bdVF2mr6oKZ.jpg', 
        address: 'Av. de Concha Espina, 1, Chamartín, 28036 Madrid, Spain',
        location: {
            lat: 40.453038,
            lng: -3.6883337
        },
        creator: 'u1'
    },
    {
        id:'p2', 
        title: 'Old Trafford', 
        describe: 'Manchester United Stadium', 
        imageUrl: 'https://as1.ftcdn.net/v2/jpg/08/42/11/96/1000_F_842119685_8XNt5p1NH9Yc1LflvL766RPUH4AApdwL.jpg', 
        address: 'Sir Matt Busby Way, Old Trafford, Stretford, Manchester M16 0RA, United Kingdom',
        location: {
            lat: 53.4630621,
            lng: -2.293915
        },
        creator: 'u2'
    }
    
];

const UserPlaces = () => {
    let [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest} = useHttpClient();

    const userId = useParams().userId;
   //console.log("uu",sendRequest);

    useEffect(() => {
        const fetchPlaces = async () => {
            //console.log("inside")
            try{
            const responseData = await sendRequest(`http://localhost:8000/api/places/user/${userId}`);
            //console.log("userPlaces: ",responseData);
            setLoadedPlaces(responseData.places);
            }catch(err){
                console.log("err");
            }
        };
        fetchPlaces();
    }, [sendRequest,userId]);
    console.log("userPlaces: ",loadedPlaces);
    //loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
    <React.Fragment>
    { loadedPlaces && <PlaceList items={loadedPlaces}/>}
    </React.Fragment>);
}

export default UserPlaces; 