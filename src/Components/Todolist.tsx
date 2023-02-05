import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import DroppableCategory from "./DroppableCategory";
import DroppableRemove from "./DroppableRemove";
import { useForm } from "react-hook-form";
import stydles from "../css/Style.module.css";

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
  height: fit-content;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  width: 100%;
  padding: 14px;
  color: #6c7990;
  span {
    padding: 0;
  }
`;

const AddListForm = styled.form`
  width: 100%;
  background-color: #ebecf0;
  border-radius: 5px;
  padding: 4px;
`;

const InputText = styled.input`
  padding: 8px 12px;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  outline: none;
  border-radius: 5px;
  box-shadow: inset 0 0 0 2px #0079bf;
  color: rgba(0, 0, 0, 0.8);
`;

const BtnDiv = styled.div`
  display: flex;
`;

const SaveBtn = styled.button`
  padding: 10px;
  background-color: #0079bf;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
`;

const XButton = styled.button`
  background-color: transparent;
  border: none;
  color: #42526e;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 8px;
  :hover {
    background-color: #dadbe2;
  }
`;

function Todolist() {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
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
  const appearForm = () => {
    const span = document.querySelector(".addList-span") as HTMLSpanElement;
    const form = document.querySelector(".addList-form") as HTMLFormElement;
    span.classList.toggle(stydles.hide);
    form.classList.toggle(stydles.hide);
  };
  const disappearForm = () => {
    const span = document.querySelector(".addList-span") as HTMLSpanElement;
    const form = document.querySelector(".addList-form") as HTMLFormElement;
    span.classList.toggle(stydles.hide);
    form.classList.toggle(stydles.hide);
  };
  const addCategory = ({ list }: any) => {
    /* 카테고리 추가 생성 코드 */
    setTodos((oldTodos) => {
      return {
        ...oldTodos,
        [list]: [],
      };
    });
    setValue("list", "");
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
                <Span onClick={appearForm} className="addList-span">
                  <span style={{ marginRight: "5px" }}>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                  Add another list
                </Span>
                <AddListForm
                  onSubmit={handleSubmit(addCategory)}
                  className={stydles.hide + " addList-form"}
                >
                  <InputText
                    {...register("list", { required: true })}
                    type="text"
                    placeholder="Enter list title..."
                  />
                  <BtnDiv>
                    <SaveBtn type="submit">Add List</SaveBtn>
                    <XButton type="button" onClick={disappearForm}>
                      <i className="fa-solid fa-xmark fa-2x"></i>
                    </XButton>
                  </BtnDiv>
                </AddListForm>
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
