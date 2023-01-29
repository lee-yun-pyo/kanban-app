import {atom} from "recoil";

export const todoState = atom({
    key: "todos",
    default: ['a', 'b', 'c', 'd']
})