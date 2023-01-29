import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.ul`
  background-color: skyblue;
  padding: 20px 20px 15px 20px;
  border-radius: 10px;
  min-height: 300px;
`;
const Card = styled.li`
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

function Todolist() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodos((oldTodos) => {
      const copyTodos = [...oldTodos];
      copyTodos.splice(source.index, 1);
      copyTodos.splice(destination?.index, 0, draggableId);
      return copyTodos;
    });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {todos.map((todo, index) => (
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
                  ))}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Todolist;
