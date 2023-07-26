import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

const todoListState = atom({
    key: 'todoListState',
    default: []
})

export {
    todoListState
}