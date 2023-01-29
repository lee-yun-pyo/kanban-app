import {atom} from "recoil";

interface ITodoState {
    [key: string]: string[];
}

export const todoState = atom<ITodoState>({
    key: "todos",
    default: {
        'To do': ['a', 'b', 'c'],
        Doing: ['d', 'e'],
        Done: ['f']
    }
})