import React, {useCallback, useReducer} from 'react';
import Input from '../../shared/components/FormElements/Input';
import './PlaceForm.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';

const Authorize = () => {
    const [formState, inputHandler]= useForm(
        {
            Email:{
                value: '',
                isValid: false
            },
            Password:{
                value: '',
                isValid: false
            }
        }
    );


    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
        <Input id='Email' element='input' type='text' label='Email' validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]} errorText='Incorrect Email' onInput={inputHandler}/>
        <Input id='Password' element='input' type='text' label='Password' validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]} errorText='Incorrect Password' onInput={inputHandler}/>
        <Button type="submit">
            LOGIN
        </Button>
    </form>
    );
};

export default Authorize; 