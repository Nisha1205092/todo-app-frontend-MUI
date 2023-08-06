import { useRecoilState } from "recoil";
import { todoListState } from '../state/todos.recoil';
import {
    COMPLETED_TODO_ROUTE,
    INCOMPLETED_TODO_ROUTE,
    TODO_ROUTE,
    USER_SIGNIN,
    USER_SIGNUP
} from "../routes/routes";
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

// created for useQuery hook
export const getAllTodos = async (email) => {
    return axios.get(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`, {
        headers: {
            'email': email
        }
    })
}

// created for useQuery hook
export const getCompletedTodos = async (email) => {
    return axios.get(`${import.meta.env.VITE_SERVER_URL}${COMPLETED_TODO_ROUTE}`, {
        headers: {
            'email': email
        }
    })
}

// created for useQuery hook
export const getIncompletedTodos = async (email) => {
    return axios.get(`${import.meta.env.VITE_SERVER_URL}${INCOMPLETED_TODO_ROUTE}`, {
        headers: {
            'email': email
        }
    })
}

export const createTodo = async (email, todoObject) => {
    return axios.post(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`,
        {
            title: todoObject.title,
            description: todoObject.description
        }, {
        headers: {
            'email': email
        }
    })
}

export const deleteTodo = async (email, todoId) => {
    return axios.delete(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`, {
        headers: {
            'email': email
        }
    })
}

export const editTodo = async (email, { todoId, title, description }) => {
    return axios.put(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`,
        { title, description },
        {
            headers: {
                'Content-Type': 'application/json',
                'email': email
            }
        }
    )
}

export const signInUser = async (email) => {
    console.log(`email: ${email}`)
    return axios.post(`${import.meta.env.VITE_SERVER_URL}${USER_SIGNIN}`, {
        headers: {
            'email': 'amina@gmail.com'
        }
    })
}

export const signUpUser = async (email, uid) => {
    return axios.post(`${import.meta.env.VITE_SERVER_URL}${USER_SIGNUP}`,
        {
            email,
            uid
        }
    )
}

/** 
* handled the server not available case
*/
export const removeTodoItem = (todoId) => {
    return axios.delete(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`)
}

export const toggleTodoCheckbox = (email, todoId, isCompleted) => {
    return axios.put(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`,
        {
            completed: isCompleted
        }, {
        headers: {
            'email': email
        }
    })
}