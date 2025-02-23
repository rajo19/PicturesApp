import React, {useCallback, useReducer, useContext} from 'react';
import Input from '../../shared/components/FormElements/Input';
import './PlaceForm.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const NewPlace = () => {
    const auth = useContext(AuthContext); 
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler]= useForm(
        {
            title:{
                value: '',
                isValid: false
            },
            description:{
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        }
    );


    const placeSubmitHandler = async event => {
        console.log(formState.inputs);
        console.log(auth);
        event.preventDefault();
        try{
        await sendRequest('http://localhost:8000/api/places',
        'POST',
        JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId,
        }),
        {'Content-Type': 'application/json'}
        )
        console.log(formState.inputs);
        }catch(err){}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input id='title' element='input' type='text' label='Title' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a Valid Text' onInput={inputHandler} />
                <Input id='description' element='textarea' label='Description' validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText='Please enter a Correct Description' onInput={inputHandler} />
                <Input id='address' element='input' label='Address' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a address' onInput={inputHandler} />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace; 