import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const DUMMY_PLACES = [
    {
        id:'p1', 
        title: 'Santiago Bernabeau', 
        description: 'Real Madrid Stadium', 
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
        description: 'Manchester United Stadium', 
        imageUrl: 'https://as1.ftcdn.net/v2/jpg/08/42/11/96/1000_F_842119685_8XNt5p1NH9Yc1LflvL766RPUH4AApdwL.jpg', 
        address: 'Sir Matt Busby Way, Old Trafford, Stretford, Manchester M16 0RA, United Kingdom',
        location: {
            lat: 53.4630621,
            lng: -2.293915
        },
        creator: 'u2'
    }
    
];

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p=> p.id === placeId);

    useEffect(()=> {
        if(identifiedPlace){
            setFormData({
                title:{
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            },true);
        }
    }, [setFormData, identifiedPlace]);
    

    console.log(identifiedPlace)

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };


    if(!identifiedPlace){
        return(
            <div className='center'>
                <Card>
                <h2>
                    Could not find place!
                </h2>
                </Card>
            </div>
        );
    }

    if(!formState.inputs.title.value){
        return(
            <div className='center'>
                <h2>
                    Loading ..... 
                </h2>
            </div>
        );
    }

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input id="title" element='input' type='text' label='Title' validators= {[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} value={formState.inputs.title.value} valid={formState.inputs.title.isValid}/>
            <Input id="description" element='textarea' label='Description' validators= {[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description" onInput={inputHandler} value={formState.inputs.description.value} valid={formState.inputs.description.isValid}/>
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    );

};

export default UpdatePlace; 
