import React, {useReducer, useEffect} from 'react';
import {validate} from '../../util/validators';

import './Input.css';

const inputReducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: false
            }
        default:
            return state;
    }
};


const Input= props => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: props.value||'', isValid: false, isTouched: props.valid||false}); 
    const touchHandler = () =>{
        dispatch({
            type:'TOUCH'
        });
    };

    const { id, onInput} = props;
    const { value, isValid} = inputState;

    useEffect(() => {
        props.onInput(props.id, inputState.value, inputState.isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators});
    };

    const element = props.element === 'input' ? (
        <input id={props.type} placeholder={props.placeholder} type={props.type} onChange={changeHandler} value={inputState.value}/>
    ):(
        <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}/>
    )
    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
};

export default Input; 