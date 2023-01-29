import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li`
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

interface IDraggableProps {
  todo: string;
  index: number;
}

function DraggableTodo({ todo, index }: IDraggableProps) {
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableTodo);