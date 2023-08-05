import { useRecoilState } from "recoil";
import { todoListState } from '../state/todos.recoil';
import { TODO_ROUTE } from "../routes/routes";
import axios from "axios";

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
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`, {
            headers: {
                'email': email
            }
        })
        const array = await res.data.todos;
        console.log({ todolist: array })
        return array; // can be []
    } catch (err) {
        if (err.response) {
            // Request made and server responded
            const { status, config } = err.response;

            if (status === 404) {
                alert(`${config.url} not found`);
            }
            if (status === 500) {
                alert("Server error");
            }
        } else if (err.request) {
            // Request made but no response from server
            alert("Error", err.message);
        } else {
            // some other errors
            alert("Error", err.message);
        }
    }

}

/** 
* handled the server not available case
*/
export const removeTodoItem = (todoId) => {
    const [todoList, setTodoList] = useRecoilState(todoListState)

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`)
        .then(() => {
            // console.log('delete successful')
            //no need to fetch from server
            const newTodosArray = todoList.filter(todo => todo._id !== todoId)
            setTodoList(newTodosArray)
        })
        .catch((err) => {
            // console.log({ err })
            // alert('Something went wrong!')
            if (err.response) {
                // Request made and server responded
                const { status, config } = err.response;

                if (status === 404) {
                    alert(`${config.url} not found`);
                }
                if (status === 500) {
                    alert("Server error");
                }
            } else if (err.request) {
                // Request made but no response from server
                alert("Error", err.message);
            } else {
                // some other errors
                alert("Error", err.message);
            }
        })
}