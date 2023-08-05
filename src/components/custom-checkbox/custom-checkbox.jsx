import { useCallback, useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import { useRecoilState } from "recoil";
import { todoListState } from "../../state/todos.recoil";
import { TODO_ROUTE } from "../../routes/routes";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/authState.recoil";
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MyCheckbox = ({ status, todoId }) => {
    const [isChecked, setIsChecked] = useState(status)
    const { email } = useRecoilValue(userState)
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const updatedTodos = [...todoList]; // Create a copy of the todosArray
    const index = updatedTodos.findIndex(todo => todo._id === todoId); // Find the index of the todo item

    const toggler = useCallback((e) => {
        console.log(`inside toggler, todoId: ${todoId}`)
        setIsChecked(e.target.checked)
        // updateCheckbox(todoId, e.target.checked)

        // console.log({ index })
        if (index !== -1) {
            updatedTodos[index] = {
                ...updatedTodos[index],
                completed: e.target.checked, // Modify the status property
            };

            // update in DB
            axios.put(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`,
                {
                    completed: e.target.checked
                }, {
                headers: {
                    'email': email
                }
            })
                .then(res => {
                    // console.log(res.data);
                    console.log('before setTodoList')
                    setTodoList(updatedTodos); // Update the todosArray state
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
    }, [index])

    return (
        <Checkbox
            sx={{
                '& .MuiSvgIcon-root': {
                    fontSize: '2rem',
                    color: "rgba(255, 255, 255, 0.6)"
                },
            }}
            checked={isChecked || false}
            onChange={toggler}
            color='secondary'
            component='span' {...label}
        />
    )
}

export default MyCheckbox