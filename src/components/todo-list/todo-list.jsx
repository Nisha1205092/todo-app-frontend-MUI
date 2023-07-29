import CircularProgress from '@mui/material/CircularProgress';
import { randomKeyGenerator } from "../../utils/utils"
import TodoItem from "../todo-item/todo-item"
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchAllTodos } from '../../utils/utils.js';
import { filteredTodoListState, todoListState } from '../../state/todos.recoil';
import { useEffect, useState } from "react";

const TodoList = () => {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const filteredLists = useRecoilValue(filteredTodoListState)
    const [isLoading, setIsLoading] = useState(true)

    console.log('not completed list: ', filteredLists)
    console.log('todoList rerendered')
    console.log({ todoList })

    useEffect(() => {
        const initializer = async () => {
            try {
                const todos = await fetchAllTodos()
                setTodoList(todos)
                setIsLoading(false)
            } catch (err) {
                console.log({ err })
                setIsLoading(false)
                alert('Something went wrong!')
            }
        }
        initializer();
        console.log({ todoList })
    }, [])

    return (
        <div style={{
            width: "100%"
        }}
        >
            {
                isLoading
                    ? <div
                        style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>
                        <CircularProgress color="secondary" />
                    </div>
                    : (
                        filteredLists.todoListNotCompleted.length === 0
                            ? <div
                                style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                You have no new task at this moment!!
                            </div>
                            : filteredLists.todoListNotCompleted.map(item => (
                                <TodoItem
                                    key={randomKeyGenerator()}
                                    todoId={item._id}
                                    todoTitle={item.title}
                                    todoDescription={item.description}
                                    todoCompleted={item.completed}
                                />
                            ))
                    )
            }
        </div>
    )
}

export default TodoList;