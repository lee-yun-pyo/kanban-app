import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Board = styled.div``;

function DroppableRemove() {
  return (
    <>
      <Droppable droppableId="remove">
        {(provided) => (
          <Board ref={provided.innerRef}>삭제{provided.placeholder}</Board>
        )}
      </Droppable>
    </>
  );
}

export default DroppableRemove;
