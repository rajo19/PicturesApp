import React,{useState, useContext} from 'react';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';

import UserList from '../components/UserList';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest} = useHttpClient();

    
    const [formState, inputHandler, setFormData]= useForm(
        {
            email:{
                value: '',
                isValid: false
            },
            password:{
                value: '',
                isValid: false
            }
        },false
    );

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else{
            setFormData({
                ...formState.inputs,
                name:{
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();
        if (isLoginMode) {
            try{
                const responseData = await sendRequest('http://localhost:8000/api/users/login', 
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-type': 'application/json'
                    }
                );
                console.log(responseData); 
                auth.login(responseData.user._id);
            }catch(err){
                console.log(err);
            }
        } else {
            try {
                const responseData = await sendRequest('http://localhost:8000/api/users/signup', 
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-type': 'application/json'
                    }
                );
                console.log(responseData); 
                auth.login(responseData.user.id);
            } catch (err) {}
        }
        //console.log(auth.isLoggedIn);
        console.log(formState.inputs);
    };
    
    return <React.Fragment>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Login</h2>
            <hr />
            <form>
                {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a Name" onInput={inputHandler} />}
                <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address" onInput={inputHandler} />
                <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid password" onInput={inputHandler} />
                <Button type="submit" disable={!formState.isValid} onClick={authSubmitHandler}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}  </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>
        </Card>
    </React.Fragment>
}

export default Auth; 