import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import DroppableCategory from "./DroppableCategory";
import DroppableRemove from "./DroppableRemove";
import { useForm } from "react-hook-form";
import stydles from "../css/Style.module.css";
import DroppableRmCategory from "./DroppableRmCategory";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  background-color: #74b9ff;
  padding: 10px;
`;

const Nav = styled.nav`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  div {
    padding: 7px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
      font-weight: 600;
      margin-left: 6px;
    }
    &:hover {
      background-color: gray;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 11px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dfe6e9;
    border-radius: 7px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 7px;
  }
`;

const Boards = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: ${(props) => "repeat(" + props.count + ", 1fr)"};
`;

const CategoryDiv = styled.div`
  height: fit-content;
  max-height: 100%;
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

const Remove = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 5px;
  box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.1);
`;
const Separator = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 1px;
  margin: 0 5px;
`;
function Todolist() {
  const [todos, setTodos] = useRecoilState(todoState);
  const length = Object.keys(todos).length + 1;
  const { register, setValue, handleSubmit } = useForm();
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination.droppableId === "rmList") {
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
    if (destination.droppableId === "rmCategory") {
      setTodos((oldTodos) => {
        const copyTodos = { ...oldTodos };
        delete copyTodos[draggableId];
        return copyTodos;
      });
      return;
    }
    if (destination.droppableId === "entire-droppable") {
      setTodos((oldTodos) => {
        const copyTodos = { ...oldTodos };
        const copyTodos2 = { ...oldTodos };
        const valuesOfBoardId = copyTodos[draggableId];
        delete copyTodos[draggableId];
        delete copyTodos2[draggableId];
        const keyArr = Object.keys(copyTodos);
        const backKeyArr = keyArr.splice(0, destination.index);
        backKeyArr.map((item) => {
          return delete copyTodos[item];
        });
        keyArr.map((item) => {
          return delete copyTodos2[item];
        });
        return { ...copyTodos2, [draggableId]: valuesOfBoardId, ...copyTodos };
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
          <Nav>
            <div>
              <i className="fa-brands fa-trello"></i>
              <h1>Trello</h1>
            </div>
          </Nav>
          <Container>
            <Droppable
              direction="horizontal"
              droppableId="entire-droppable"
              type="CATEGORY"
            >
              {(provided, snapshot) => (
                <Boards
                  count={length}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {Object.keys(todos).map((boardId, index) => (
                    <Draggable
                      draggableId={boardId}
                      index={index}
                      key={boardId + String(index)}
                    >
                      {(provided, snapshot) => (
                        <div style={{ height: "100%" }}>
                          <CategoryDiv
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DroppableCategory
                              key={boardId}
                              todos={todos[boardId]}
                              boardId={boardId}
                            />
                          </CategoryDiv>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
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
              )}
            </Droppable>
          </Container>
          <Remove>
            <DroppableRmCategory />
            <Separator />
            <DroppableRemove />
          </Remove>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Todolist;
