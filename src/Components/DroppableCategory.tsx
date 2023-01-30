import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableTodo from "./DraggableTodo";

const Wrapper = styled.div`
  background-color: skyblue;
  border-radius: 10px;
  padding: 20px 20px 15px 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 15px;
`;

interface IBoardProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

const Board = styled.ul<IBoardProps>`
  width: 100%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.isDraggingFromThisWith
      ? "red"
      : "blue"};
  flex-grow: 1;
`;

interface IDroppableProps {
  todos: string[];
  boardId: string;
}

function DroppableCategory({ todos, boardId }: IDroppableProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableTodo key={todo} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableCategory;
