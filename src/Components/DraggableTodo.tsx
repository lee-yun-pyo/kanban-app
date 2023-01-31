import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { modalState } from "../atoms";
import { useSetRecoilState } from "recoil";
import ModalEditTodo from "./ModalEditTodo";

const Card = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "tomato" : "whitesmoke")};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

const EditBtn = styled.button``;

interface IDraggableProps {
  boardId: string;
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableTodo({ boardId, todoId, todoText, index }: IDraggableProps) {
  const setDisplayModal = useSetRecoilState(modalState);
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget.parentElement;
    console.log(card?.dataset.rbdDraggableId);
    console.log(card?.parentElement?.parentElement);
    const cssInfo = card?.getBoundingClientRect();
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
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            {todoText}
            <EditBtn onClick={handleEdit}>편집</EditBtn>
          </Card>
        )}
      </Draggable>
      <ModalEditTodo boardId={boardId} index={index} />
    </>
  );
}

export default React.memo(DraggableTodo);
