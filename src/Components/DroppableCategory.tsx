import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableTodo from "./DraggableTodo";
import { useForm } from "react-hook-form";
import { ITodo, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React, { useState } from "react";
import Title from "./Title";

const Wrapper = styled.div`
  background-color: #ebecf0;
  border-radius: 5px;
  width: 272px;
  height: 100%;
  padding: 1px 8px;
  margin-right: 10px;
  // max-height: 100%;
`;

interface IBoardProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

const Board = styled.ul<IBoardProps>`
  width: 100%;
  min-height: 1px;
  max-height: 100%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#E2E4EA"
      : props.isDraggingFromThisWith
      ? "#E2E4EA"
      : "#ebecf0"};
  overflow-x: hidden;
  overflow-y: auto;
  /* ::-webkit-scrollbar {
    width: 11px;
  } */
  /* ::-webkit-scrollbar-thumb {
    background-color: #dfe6e9;
    border-radius: 7px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 7px;
  } */
`;

const AddCardDiv = styled.div`
  margin: 5px 0;
`;

const AddCardBtn = styled.div`
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #dadbe2;
    span {
      color: #172b4d;
    }
  }
  span {
    color: #6c7990;
  }
`;

const AddCard = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 11px;
  box-shadow: 0px 1.5px 0px rgba(0, 0, 0, 0.2);
`;

const AddFormDiv = styled.div`
  margin-bottom: 11px;
`;

const CardInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

const BtnDiv = styled.div`
  display: flex;
`;

const SaveBtn = styled.button`
  padding: 10px 12px;
  background-color: #0079bf;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
`;

const XButton = styled.button`
  background-color: transparent;
  border: none;
  color: #42526e;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 8px;
  :hover {
    background-color: #dadbe2;
  }
`;

interface IDroppableProps {
  todos: ITodo[];
  boardId: string;
}

function DroppableCategory({ todos, boardId }: IDroppableProps) {
  const [showing, setShowing] = useState(false);
  const setTodo = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ todo }: any) => {
    const newObj = {
      id: Date.now(),
      text: todo,
    };
    setTodo((allBoard) => {
      return {
        ...allBoard,
        [boardId]: [...allBoard[boardId], newObj],
      };
    });
    setValue("todo", "");
  };
  return (
    <Wrapper>
      <Title boardId={boardId} />
      <Droppable type="LIST" droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableTodo
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                index={index}
                boardId={boardId}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
      {showing ? (
        <AddFormDiv>
          <form onSubmit={handleSubmit(onValid)}>
            <AddCard>
              <CardInput
                {...register("todo", { required: true })}
                placeholder="Enter a title for this card..."
                type="text"
              />
            </AddCard>
            <BtnDiv>
              <SaveBtn type="submit">Add Card</SaveBtn>
              <XButton
                onClick={() => setShowing((prev) => !prev)}
                type="button"
              >
                <i className="fa-solid fa-xmark fa-2x"></i>
              </XButton>
            </BtnDiv>
          </form>
        </AddFormDiv>
      ) : (
        <AddCardDiv onClick={() => setShowing((prev) => !prev)}>
          <AddCardBtn>
            <span>
              <span style={{ marginRight: "5px" }}>
                <i className="fa-solid fa-plus"></i>
              </span>
              Add a Card
            </span>
          </AddCardBtn>
        </AddCardDiv>
      )}
    </Wrapper>
  );
}

export default DroppableCategory;
