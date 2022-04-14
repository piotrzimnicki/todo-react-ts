import React, {useEffect, useState} from 'react';
import './App.css';
import {SingleTodo} from './components/TodoList/SingleTodo/SingleTodo';
import {TodoForm} from "./components/TodoList/TodoForm/TodoForm";
import {ErrorMessage} from "./utils/error-message";

export interface SingleTodoInterface {
    id: string | number,
    text: string,
    completed: boolean
}

export const FilterOptions = {
    all: "all",
    cpt: "completed",
    ncpt: "not completed"
}
export const App:React.FC = () => {
    const [allTodos, setAllTodos] = useState<SingleTodoInterface[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<SingleTodoInterface[]>([]);
    const [filter,setFilter] = useState("all");
    const [error,setError] = useState<ErrorMessage>({
        isError: false,
        message: ''
    })

    function filterHandle(filter: string) {
        switch (filter) {
            case FilterOptions.cpt:
                setFilteredTodos(allTodos.filter(el => el.completed === true));
                break;
            case FilterOptions.ncpt:
                setFilteredTodos(allTodos.filter(el => el.completed === false));
                break;
            default:
                setFilteredTodos(() => allTodos);
        }
    }

    useEffect(() => {
        const localData = localStorage.getItem('todoReactTs');
        if (localData) {
            setAllTodos(() => JSON.parse(localData));
        }
    },[])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('todoReactTs', JSON.stringify(allTodos))
        },100);
        filterHandle(filter);
    }, [allTodos,filteredTodos]);

    useEffect(() => {
        filterHandle(filter)
    }, [filter])

    return (
        <div className="todo-wrapper">
            <div className="error-message-wrapper">
                {
                    error.isError &&
                    <p className="error-message">
                        <span>{error.message}</span>
                        <button onClick={() => setError(data => ({...data,isError: false}))}>X</button>
                    </p>
                }
            </div>
            <TodoForm
                error={error}
                setError={setError}
                setFilter={setFilter}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
            />
            {allTodos.length > 0
                ?
                <ul>
                    {filteredTodos.map(todo =>
                        <SingleTodo
                            setError={setError}
                            setAllTodos={setAllTodos}
                            allTodos={filteredTodos}
                            key={todo.id}
                            todo={todo}
                        />)}
                </ul>
                :
                null}
        </div>
    );
}
