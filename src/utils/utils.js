import { useRecoilState } from "recoil";
import { todoListState } from '../state/todos.recoil';

export const randomKeyGenerator = () => {
    const key = Math.floor(Math.random() * 1000000);
    return key;
}

export const fetchAllTodos = async () => {
    console.log(import.meta.env.VITE_SERVER_URL)
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
        method: 'GET'
    })
    const response = await data.json()
    const array = await response.todoArray;
    return array; // can be []
}

/**
 * handled the server not available case

export const updateCheckbox = (todoId, checkedStatus) => {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const updatedTodos = [...todoList]; // Create a copy of the todosArray

    const index = updatedTodos.findIndex(todo => todo._id === todoId); // Find the index of the todo item
    // console.log({ index })
    if (index !== -1) {
        updatedTodos[index] = {
            ...updatedTodos[index],
            completed: checkedStatus, // Modify the status property
        };

        // update in DB
        fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: checkedStatus }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(data => {
                // console.log(data);
                console.log('before setTodoList')
                setTodoList(updatedTodos); // Update the todosArray state
            })
            .catch((err) => {
                console.log({ err });
                alert('Something went wrong! Please refresh!')
            })
    }
}
*/

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

/**
 * handled the server not available case

export const addTodoItem = ({ title, completed, description }) => {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    let todoId;

    fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
            completed: false
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            todoId = data.id
            // no need to fetch from the server
            const newTodosArray = [...todoList];
            newTodosArray.push({ _id: todoId, title, completed, description })
            setTodoList(newTodosArray)
        })
        .catch((err) => {
            console.log({ err })
            alert('Something went wrong!')
        })
}
*/

/**
 * handled the server not available case

const updateTodoItem = (todoId, title, description) => {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    // save in DB
    fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const newTodosArray = [...todoList];
            const index = newTodosArray.findIndex(item => item._id === todoId);
            if (index !== -1) {
                newTodosArray[index].title = title;
                newTodosArray[index].description = description;
                setTodoList(newTodosArray)
            }
            // console.log('title and description updated')
        })
        .catch((err) => {
            console.log({ err });
            alert('Something went wrong! Please refresh!')
        })
}
*/