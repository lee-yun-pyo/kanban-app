import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { modalState } from "../atoms";
import { useSetRecoilState } from "recoil";
import ModalEditTodo from "./ModalEditTodo";

const Card = styled.li<{ isDragging: boolean }>`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px 10px;
  margin-bottom: 11px;
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 0px 2px rgba(0, 0, 0, 0.3)"
      : "0px 1.5px 0px rgba(0, 0, 0, 0.2)"};
  position: relative;
  :hover {
    background-color: #f4f5f7;
    button {
      i {
        display: block;
      }
    }
  }
`;

const EditBtn = styled.button`
  display: hidden;
  position: absolute;
  top: 2px;
  right: 2px;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background-color: transparent;
  :hover {
    background-color: #dadbe2;
    i {
      color: #172b4d;
    }
  }
  i {
    display: none;
    color: #6b778c;
  }
`;

interface IDraggableProps {
  boardId: string;
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableTodo({ boardId, todoId, todoText, index }: IDraggableProps) {
  const setDisplayModal = useSetRecoilState(modalState);
  const [id, setId] = useState("");
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget.parentElement as HTMLLIElement;
    const cssInfo = card?.getBoundingClientRect();
    setId(card?.id);
    if (cssInfo) {
      const left = cssInfo.left;
      const top = cssInfo.top;
      const width = cssInfo.width;
      setDisplayModal({ isDisplay: true, position: [top, left, width] });
    }
  };
  return (
    <>
      <Draggable draggableId={todoId + ""} index={index}>
        {(provided, snapshot) => (
          <Card
            id={boardId}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            {todoText}
            <EditBtn onClick={handleEdit}>
              <i className="fa-solid fa-pen"></i>
            </EditBtn>
          </Card>
        )}
      </Draggable>
      {id === "" ? <></> : <ModalEditTodo boardId={id} index={index} />}
    </>
  );
}

export default React.memo(DraggableTodo);
