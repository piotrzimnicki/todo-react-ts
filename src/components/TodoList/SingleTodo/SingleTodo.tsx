import React, {Dispatch, SetStateAction, useState} from "react";
import {SingleTodoInterface} from "../../../App";
import './SingleTodo.css'
import {ErrorMessage, setErrorMessage} from "../../../utils/error-message";
interface Props {
    todo: SingleTodoInterface;
    allTodos: SingleTodoInterface[];
    setAllTodos: Dispatch<SetStateAction<SingleTodoInterface[]>>;
    setError: Dispatch<SetStateAction<ErrorMessage>>;
}

export const SingleTodo: React.FC<Props> = ({
    todo,
    allTodos,
    setAllTodos,
    setError
}) => {
    const [edit,setEdit] = useState(false);
    function checkboxHandler () {
        setAllTodos(allTodos.map(el => {
            if(el.id === todo.id) {
                return {...el, completed: !el.completed}
            }
            return el
        }))
    }
    function deleteHandler (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setAllTodos(allTodos.filter(el => el.id !== todo.id));
    }
    function editHandler () {
        if(todo.text.length < 3) {
            setErrorMessage(true,'Please enter at least 3 characters', setError);
            return;
        } else {
            setErrorMessage(false,'', setError);
        }
        setEdit(edit => !edit);
    }
    function inputHandler(e:React.ChangeEvent<HTMLInputElement> ) {

        setAllTodos(allTodos.map(el => {
            if(el.id === todo.id) return {...el, text: e.target.value}
            return el
        }))
    }
    return (
        <li className={`single-todo${todo.completed === true ? " completed" : ""}` }>
            {edit ?
                <input autoFocus onChange={inputHandler} type="text" value={todo.text}/>
            :
                <p>{todo.text}</p>
            }

            <div className="todo-controls">
                <input
                    checked={todo.completed ? true : false}
                    onChange={checkboxHandler}
                    type="checkbox"
                    name="isComplete"
                />
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>X</button>
            </div>

        </li>
    )
}