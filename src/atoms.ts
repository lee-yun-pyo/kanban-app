import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

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
        'To do': [{id: 2, text: "연습"}],
        Doing: [{id: 3, text: "마우스"}],
        Done: [],
    },
    effects_UNSTABLE: [persistAtom],
})

export const modalState = atom({
    key: "isDisplay",
    default: {
        isDisplay: false,
        position: [0, 0, 0]
        // top, left, width 순
    }
})