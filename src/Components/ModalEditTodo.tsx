import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { modalState, todoState } from "../atoms";

const Modal = styled.div<{ showModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.showModal ? "" : "none")};
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
`;

interface IContentProps {
  top: number;
  left: number;
  width: number;
}

const Content = styled.div<IContentProps>`
  background-color: #fff;
  position: absolute;
  top: ${(props) => String(props.top) + "px"};
  left: ${(props) => String(props.left) + "px"};
  width: ${(props) => String(props.width) + "px"};
  padding: 35px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 420px) {
    width: 330px;
    padding: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  font-size: 18px;
  border: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-bottom: 30px;
  &:focus {
    outline: none;
    border-color: #273c75;
  }
  @media (max-width: 420px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const Btn = styled.button`
  width: 90px;
  height: 45px;
  font-size: 17px;
  background-color: rgba(39, 60, 117, 0.9);
  border: none;
  cursor: pointer;
  border-radius: 7px;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgb(39, 60, 117);
    box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.05);
  }
  :first-child {
    margin-right: 20px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.05);
    }
  }
  @media (max-width: 420px) {
    width: 75px;
    height: 40px;
  }
`;

interface IModalEditProps {
  boardId: string;
  index: number;
}

function ModalEditTodo({ boardId, index }: IModalEditProps) {
  const { register, handleSubmit } = useForm();
  const [displayModal, setDisplayModal] = useRecoilState(modalState);
  const setTodo = useSetRecoilState(todoState);
  const hideModal = () => {
    setDisplayModal((prev) => {
      return {
        ...prev,
        isDisplay: false,
      };
    });
  };
  const editTodo = ({ todo }: any) => {
    const editCard = {
      id: Date.now(),
      text: todo,
    };
    setTodo((oldTodos) => {
      /* 수정 기능 구현 진행 중 */
      //   const copyTodos = [...oldTodos[boardId]];
      //   copyTodos.splice(index, 1, editCard);
      return {
        // ...oldTodos,
        // [boardId]: copyTodos,
      };
    });
    setDisplayModal((prev) => {
      return {
        ...prev,
        isDisplay: false,
      };
    });
  };
  const addCategory = ({ value }: any) => {
    /* 카테고리 추가 생성 코드 */
    setTodo((oldTodos) => {
      return {
        ...oldTodos,
        [value]: [],
      };
    });
  };
  return (
    <Modal showModal={displayModal.isDisplay}>
      <Overlay onClick={hideModal} />
      <Content
        top={displayModal.position[0]}
        left={displayModal.position[1]}
        width={displayModal.position[2]}
      >
        <Form onSubmit={handleSubmit(editTodo)}>
          <Input {...register("todo", { required: true })} />
          <Btn type="submit">Save</Btn>
        </Form>
      </Content>
    </Modal>
  );
}

export default ModalEditTodo;
