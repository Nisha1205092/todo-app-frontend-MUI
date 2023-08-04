import { useRecoilState } from "recoil";
import { todoListState } from '../state/todos.recoil';
import { TODO_ROUTE } from "../routes/routes";

// save in browser's local storage
// and Recoil state
export const saveUser = (user, setAuthUser) => {
    if (user) {
        const auth = {
            email: user.email,
            uid: user.uid
        }
        // save state locally as a recoil state
        setAuthUser(auth)
        const authString = JSON.stringify(auth)
        localStorage.setItem('user', authString)
    }
}

export const randomKeyGenerator = () => {
    const key = Math.floor(Math.random() * 1000000);
    return key;
}

export const fetchAllTodos = async (email) => {
    // console.log(import.meta.env.VITE_SERVER_URL)
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'email': email
        }
    })
    const response = await data.json()
    const array = await response.todos;
    console.log({ todolist: array })
    return array; // can be []
}

/** 
* handled the server not available case
*/
export const removeTodoItem = (todoId) => {
    const [todoList, setTodoList] = useRecoilState(todoListState)

    fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`, {
        method: 'DELETE'
    })
        .then(() => {
            // console.log('delete successful')
            //no need to fetch from server
            const newTodosArray = todoList.filter(todo => todo._id !== todoId)
            setTodoList(newTodosArray)
        })
        .catch((err) => {
            console.log({ err });
            alert('Something went wrorng!')
        })
}