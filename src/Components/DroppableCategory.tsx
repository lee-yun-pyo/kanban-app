import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableTodo from "./DraggableTodo";
import { useForm } from "react-hook-form";
import { ITodo, todoState, modalState } from "../atoms";
import { useSetRecoilState } from "recoil";
import ModalEditTodo from "./ModalEditTodo";

const Wrapper = styled.div`
  background-color: #ebecf0;
  border-radius: 5px;
  width: 272px;
  height: fit-content;
  padding: 0 5px;
`;

const TitleDiv = styled.div`
  position: relative;
  padding: 10px 8px;
  padding-right: 36px;
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  color: #172b4d;
`;

const EditBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  :hover {
    background-color: #dadbe2;
    i {
      color: #172b4d;
    }
  }
  i {
    color: #6b778c;
  }
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
      ? "#E2E4EA"
      : props.isDraggingFromThisWith
      ? "#E2E4EA"
      : "#ebecf0"};
  /* flex-grow: 1; */
  li {
    color: blue;
    &:last-child {
      color: red;
    }
  }
`;

const AddCardDiv = styled.div`
  padding: 5px;
`;

const AddCard = styled.div`
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #dadbe2;
    span {
      color: #172b4d;
    }
  }
  span {
    color: #6c7990;
  }
`;

interface IDroppableProps {
  todos: ITodo[];
  boardId: string;
}

function DroppableCategory({ todos, boardId }: IDroppableProps) {
  const setTodo = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
  const setDisplayModal = useSetRecoilState(modalState);
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const title = event.currentTarget.parentElement;
    const cssInfo = title?.getBoundingClientRect();
    if (cssInfo) {
      const left = cssInfo.left;
      const top = cssInfo.top;
      const width = cssInfo.width;
      setDisplayModal({ isDisplay: true, position: [top, left, width] });
    }
  };
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
    <>
      <Wrapper>
        <TitleDiv>
          <Title>{boardId}</Title>
          <EditBtn type="button" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </EditBtn>
        </TitleDiv>
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
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
            </Board>
          )}
        </Droppable>
        <AddCardDiv>
          <AddCard>
            <span>
              <span style={{ marginRight: "5px" }}>
                <i className="fa-solid fa-plus"></i>
              </span>
              Add a Card
            </span>
          </AddCard>
        </AddCardDiv>
        {/* <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("todo", { required: true })}
            placeholder="Write todos..."
          />
        </Form> */}
        <ModalEditTodo toUse="category" boardId={boardId} />
      </Wrapper>
    </>
  );
}

export default DroppableCategory;
