import React, {Dispatch, SetStateAction, useState} from "react";
import { FilterOptions, SingleTodoInterface} from "../../../App";
import './TodoForm.css';
import {ErrorMessage, setErrorMessage} from "../../../utils/error-message";

interface Props {
    allTodos: SingleTodoInterface[];
    setAllTodos: Dispatch<SetStateAction<SingleTodoInterface[]>>;
    setFilter:  Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<ErrorMessage>>;
    error: ErrorMessage;
}



export const TodoForm: React.FC<Props> = ({setAllTodos,allTodos,setFilter, setError,error}) => {
    const [todoData, setTodoData] = useState<SingleTodoInterface>({
        text: '',
        completed: false,
        id: '',
    })
    const sendData = (e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault();
        console.log(todoData.text.length)
        if(todoData.text.length < 3) {
           setErrorMessage(true,'Please enter at least 3 characters',setError);
           return;
        } else {
            setErrorMessage(false,'',setError);
        }
        setAllTodos((allTodos: SingleTodoInterface[]) => {
            return [...allTodos, {
                ...todoData,
                id: (Math.random()*1000000).toFixed(0)
            }]
        })
        setTodoData(data => ({...data, text: ''}))
    }
    const filterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(() => e.target.value);
    }
    return(
        <div className="form-wrapper">
            <form onSubmit={sendData}>
                <input
                    value={todoData.text}
                    onChange={e => {setTodoData(data => ({ ...data,text: e.target.value}))}}
                    type="text" name="todo-text"
                />
                <button type="submit">Add</button>
                <select onChange={filterHandler}>
                    <option value={FilterOptions.all}>{FilterOptions.all}</option>
                    <option value={FilterOptions.cpt}>{FilterOptions.cpt}</option>
                    <option value={FilterOptions.ncpt}>{FilterOptions.ncpt}</option>
                </select>
            </form>
        </div>

    )
}