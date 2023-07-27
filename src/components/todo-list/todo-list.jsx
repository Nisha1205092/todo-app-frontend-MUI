import { randomKeyGenerator } from "../../utils/utils"
import TodoItem from "../todo-item/todo-item"
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchAllTodos } from '../../utils/utils.js';
import { filteredTodoListState, todoListState } from '../../state/todos.recoil';
import { useEffect } from "react";

const TodoList = () => {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const filteredLists = useRecoilValue(filteredTodoListState)

    console.log('not completed list: ', filteredLists)
    console.log('todoList rerendered')
    console.log({ todoList })

    useEffect(() => {
        const initializer = async () => {
            try {
                const todos = await fetchAllTodos()
                setTodoList(todos)
            } catch (err) {
                console.log({ err })
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
                filteredLists.todoListNotCompleted.length === 0 ? 'loading' : filteredLists.todoListNotCompleted.map(item => (
                    <TodoItem
                        key={randomKeyGenerator()}
                        todoId={item._id}
                        todoTitle={item.title}
                        todoDescription={item.description}
                        todoCompleted={item.completed}
                    />
                ))
            }
        </div>
    )
}

export default TodoList;