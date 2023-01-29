import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import DroppableCategory from "./DroppableCategory";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

function Todolist() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      // same board movement
      setTodos((oldTodos) => {
        const copyTodos = [...oldTodos[source.droppableId]];
        copyTodos.splice(source.index, 1);
        copyTodos.splice(destination.index, 0, draggableId);
        return {
          ...oldTodos,
          [source.droppableId]: copyTodos,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setTodos((oldTodos) => {
        const sourceTodos = [...oldTodos[source.droppableId]];
        const destTodos = [...oldTodos[destination.droppableId]];
        sourceTodos.splice(source.index, 1);
        destTodos.splice(destination.index, 0, draggableId);
        return {
          ...oldTodos,
          [source.droppableId]: sourceTodos,
          [destination.droppableId]: destTodos,
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <DroppableCategory
                key={boardId}
                todos={todos[boardId]}
                boardId={boardId}
              />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Todolist;
