import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "tomato" : "whitesmoke")};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

interface IDraggableProps {
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableTodo({ todoId, todoText, index }: IDraggableProps) {
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableTodo);
