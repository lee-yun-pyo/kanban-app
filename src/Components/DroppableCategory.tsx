import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableTodo from "./DraggableTodo";
import { useForm } from "react-hook-form";
import { ITodo, todoState } from "../atoms";
import { useRecoilState } from "recoil";

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
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
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
  todos: ITodo[];
  boardId: string;
}

function DroppableCategory({ todos, boardId }: IDroppableProps) {
  const [todo, setTodo] = useRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ todo }: any) => {
    const newObj = {
      id: Date.now(),
      text: todo,
    };
    setTodo((allBoard) => {
      return {
        ...allBoard,
        [boardId]: [newObj, ...allBoard[boardId]],
      };
    });
    setValue("todo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          placeholder="Write todos..."
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableTodo
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableCategory;
