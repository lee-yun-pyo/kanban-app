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
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setTodos((oldTodos) => {
    //   const copyTodos = [...oldTodos];
    //   copyTodos.splice(source.index, 1);
    //   copyTodos.splice(destination?.index, 0, draggableId);
    //   return copyTodos;
    // });
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
