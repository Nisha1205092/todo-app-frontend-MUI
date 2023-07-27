import {
    atom,
    selector,
} from 'recoil';

const todoListState = atom({
    key: 'todoListState',
    default: []
})

const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
        const list = get(todoListState)
        const todoListCompleted = list.filter(item => item.completed)
        const todoListNotCompleted = list.filter(item => !item.completed)
        const totalTodos = list.length
        const completedCount = todoListCompleted.length

        return {
            todoListCompleted,
            todoListNotCompleted,
            totalTodos,
            completedCount
        }
    }
})

export {
    todoListState,
    filteredTodoListState
}