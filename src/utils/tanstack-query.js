import { useQuery, useMutation } from "@tanstack/react-query";
import {
    getIncompletedTodos,
    getCompletedTodos,
    getAllTodos,
    createTodo,
    deleteTodo,
    toggleTodoCheckbox,
    signInUser,
    signUpUser
} from "./utils";

const stateDuration = 6000;

// const queryClient = useQueryClient();


export const useIncompletedTodos = (user) => useQuery({
    queryKey: [user.email, 'todo', 'incompletedTodos'],
    queryFn: () => getIncompletedTodos(user.email),
    staleTime: stateDuration
})

export const useCompletedTodos = (email) => useQuery({
    queryKey: [email, 'todo', 'completedTodos'],
    queryFn: () => getCompletedTodos(email),
    staleTime: stateDuration
})

// unused
export const useAllTodos = (user) => useQuery({
    queryKey: [user.email, 'todo', 'allTodos'],
    queryFn: () => getAllTodos(user.email),
    staleTime: stateDuration
})

export const useCreateTodo = (user, todoObject) => useMutation({
    mutationFn: () => createTodo(user.email, todoObject),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [user.email, 'todo', 'incompletedTodos']
        })
    }
})

export const useDeleteTodo = (user, todoId) => useMutation({
    mutationFn: () => deleteTodo(user.email, todoId),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [user.email, 'todo']
        })
    }
})

export const useEditTodo = (user, todoObject) => useMutation({
    mutationFn: () => editTodo(user.email, todoObject),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [user.email, 'todo']
        })
    }
})

export const useToggleTodoCheckbox = (user, todoId, isCompleted) => useMutation({
    mutationFn: () => toggleTodoCheckbox(user.email, todoId, isCompleted),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [user.email, 'todo']
        })
    }
})

export const useUserSignIn = (user) => useMutation({
    mutationFn: () => signInUser(user.email)
})

export const useUserSignUp = (user) => useMutation({
    mutationFn: () => signUpUser(user.email, user.uid)
})