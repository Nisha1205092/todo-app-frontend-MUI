import CircularProgress from '@mui/material/CircularProgress';
import { getAllTodos, getIncompletedTodos, randomKeyGenerator } from "../../utils/utils"
import TodoItem from "../todo-item/todo-item"
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchAllTodos } from '../../utils/utils.js';
import { filteredTodoListState, todoListState } from '../../state/todos.recoil';
import { useEffect, useState } from "react";
import { userState } from '../../state/authState.recoil';
import { useQuery } from '@tanstack/react-query';
import { useIncompletedTodos } from '../../utils/tanstack-query';
import useAuth from '../../customHooks/useAuth';

const TodoList = () => {
    const [user] = useAuth();
    // const [todoList, setTodoList] = useRecoilState(todoListState)
    // const filteredLists = useRecoilValue(filteredTodoListState)
    // const { email } = useRecoilValue(userState)


    // query
    const {
        status,
        error,
        data,
    } = useIncompletedTodos(user)

    if (status === 'loading') {
        return (
            <div
                style={{
                    color: 'white',
                    textAlign: 'center'
                }}>
                <CircularProgress color="secondary" />
            </div>
        )
    }

    if (status === 'error') {
        return <h1>{JSON.stringify(error)}</h1>
    }


    return (
        <div style={{
            width: "100%"
        }}
        >
            {data.length === 0
                ? <div
                    style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>
                    You have no new task at this moment!!
                </div>
                : data.map(item => (
                    <TodoItem
                        key={randomKeyGenerator()}
                        todoId={item._id}
                        todoTitle={item.title}
                        todoDescription={item.description}
                        todoCompleted={item.completed}
                    />
                ))}
        </div>
    )



    // const [isLoading, setIsLoading] = useState(true)
    // // console.log('not completed list: ', filteredLists)
    // // console.log('todoList rerendered')
    // // console.log({ todoList })

    // useEffect(() => {
    //     const initializer = async () => {
    //         try {
    //             const todos = await fetchAllTodos(email)
    //             setTodoList(todos)
    //             setIsLoading(false)
    //         } catch (err) {
    //             console.log({ err })
    //             setIsLoading(false)
    //             alert('Something went wrong!')
    //         }
    //     }
    //     initializer();
    //     // console.log({ todoList })
    // }, [])

    // return (
    //     <div style={{
    //         width: "100%"
    //     }}
    //     >
    //         {
    //             isLoading
    //                 ? <div
    //                     style={{
    //                         color: 'white',
    //                         textAlign: 'center'
    //                     }}>
    //                     <CircularProgress color="secondary" />
    //                 </div>
    //                 : (
    //                     filteredLists.todoListNotCompleted.length === 0
    //                         ? <div
    //                             style={{
    //                                 color: 'white',
    //                                 textAlign: 'center'
    //                             }}>
    //                             You have no new task at this moment!!
    //                         </div>
    //                         : filteredLists.todoListNotCompleted.map(item => (
    //                             <TodoItem
    //                                 key={randomKeyGenerator()}
    //                                 todoId={item._id}
    //                                 todoTitle={item.title}
    //                                 todoDescription={item.description}
    //                                 todoCompleted={item.completed}
    //                             />
    //                         ))
    //                 )
    //         }
    //     </div>
    // )
}

export default TodoList;