import {atom} from "recoil";

export interface ITodo {
    id: number;
    text: string;
}

interface ITodoState {
    [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
    key: "todos",
    default: {
        'To do': [],
        Doing: [],
        Done: []
    }
})

export const modalState = atom({
    key: "isDisplay",
    default: {
        isDisplay: false,
        position: [0, 0, 0]
        // top, left, width 순
    }
})