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
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
`;

interface IContentProps {
  top: number;
  left: number;
  width: number;
}

const Content = styled.div<IContentProps>`
  position: absolute;
  top: ${(props) => String(props.top) + "px"};
  left: ${(props) => String(props.left) + "px"};
  width: ${(props) => String(props.width) + "px"};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Input = styled.input`
  padding: 13px;
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  outline: none;
  box-shadow: 0px 1.5px 0px rgba(255, 255, 255, 0.1);
`;

const Btn = styled.button`
  padding: 10px 24px;
  background-color: rgb(0, 121, 191);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgba(0, 121, 191, 0.8);
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
  const editTodo = ({ value }: any) => {
    const editedTodo = {
      id: Date.now(),
      text: value,
    };
    setTodo((oldTodos) => {
      /* 수정 기능 구현 */
      const allTodos = { ...oldTodos };
      const editList = [...oldTodos[boardId]];
      editList.splice(index, 1, editedTodo);
      const newObj = {
        [boardId]: editList,
      };
      const result = Object.assign(allTodos, newObj);
      return result;
    });
    setDisplayModal((prev) => {
      return {
        ...prev,
        isDisplay: false,
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
          <Input {...register("value", { required: true })} />
          <Btn type="submit">Save</Btn>
        </Form>
      </Content>
    </Modal>
  );
}

export default ModalEditTodo;
