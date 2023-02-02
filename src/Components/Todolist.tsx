import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import DroppableCategory from "./DroppableCategory";
import DroppableRemove from "./DroppableRemove";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #74b9ff;
  padding: 10px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  width: 100%;
`;

const AddListDiv = styled.div`
  width: 272px;
  background-color: #ebecf0;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 4px;
  span {
    padding: 6px 8px;
    color: #6c7990;
    span {
      padding: 0;
    }
  }
  :hover {
    background-color: #dadbe2;
    span {
      color: #172b4d;
    }
  }
`;

function Todolist() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "remove") {
      // To remove
      setTodos((oldTodos) => {
        const copyTodos = [...oldTodos[source.droppableId]];
        copyTodos.splice(source.index, 1);
        return {
          ...oldTodos,
          [source.droppableId]: copyTodos,
        };
      });
      return;
    }
    if (destination.droppableId === source.droppableId) {
      // same board movement
      setTodos((oldTodos) => {
        const copyTodos = [...oldTodos[source.droppableId]];
        const todoObj = copyTodos[source.index];
        copyTodos.splice(source.index, 1);
        copyTodos.splice(destination.index, 0, todoObj);
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
        const todoObj = sourceTodos[source.index];
        sourceTodos.splice(source.index, 1);
        destTodos.splice(destination.index, 0, todoObj);
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
          <div>
            <Boards>
              {Object.keys(todos).map((boardId) => (
                <DroppableCategory
                  key={boardId}
                  todos={todos[boardId]}
                  boardId={boardId}
                />
              ))}
              <AddListDiv>
                <span>
                  <span style={{ marginRight: "5px" }}>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                  Add another list
                </span>
              </AddListDiv>
            </Boards>
            <DroppableRemove />
          </div>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Todolist;
