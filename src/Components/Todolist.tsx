import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

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

const todos = ["a", "b", "c", "d"];

function Todolist() {
  const onDragEnd = () => {};
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
