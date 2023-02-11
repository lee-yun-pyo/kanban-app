import styled from "styled-components";
import stydles from "../css/Style.module.css";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

const TitleDiv = styled.div`
  position: relative;
  padding: 10px 0;
  padding-right: 36px;
  margin-bottom: 5px;
`;

const TitleText = styled.p`
  font-weight: 600;
  font-size: 18px;
  padding: 5px;
  width: 100%;
  color: #172b4d;
  cursor: pointer;
`;

const InputText = styled.input`
  width: 100%;
  height: 28px;
  padding: 4px 8px;
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #0079bf;
  font-weight: 600;
`;

interface ITitleProps {
  boardId: string;
}

function Title({ boardId }: ITitleProps) {
  const { register, setValue, handleSubmit } = useForm();
  const setTodo = useSetRecoilState(todoState);
  const displayTitleText = () => {
    const titleText = document.querySelector(`.p-title.${stydles.hide}`);
    titleText?.classList.toggle(stydles.hide);
    titleText?.nextElementSibling?.classList.toggle(stydles.hide);
  };
  const changeTitle = ({ title }: any) => {
    if (title === boardId || title === "") {
      displayTitleText();
    } else {
      /* list title 변경 */
      setTodo((oldTodos) => {
        const copyTodos = { ...oldTodos };
        const copyTodos2 = { ...oldTodos };
        const keyArr = Object.keys(copyTodos);
        const keyArr2 = Object.keys(copyTodos);
        let backKeyArr: string[] = [];
        let frontKeyArr: string[] = [];
        const valuesOfBoardId = copyTodos[boardId];
        const targetIndex = keyArr.findIndex((v) => v === boardId);
        if (targetIndex < keyArr.length) {
          backKeyArr = keyArr.splice(targetIndex);
          frontKeyArr = keyArr2.splice(0, targetIndex + 1);
        }
        backKeyArr.map((item) => {
          return delete copyTodos[item];
        });
        frontKeyArr.map((item) => {
          return delete copyTodos2[item];
        });
        return { ...copyTodos, [title]: valuesOfBoardId, ...copyTodos2 };
      });
      setValue("title", "");
    }
  };
  const hideElement = (event: React.MouseEvent<HTMLSpanElement>) => {
    displayTitleText();
    event.currentTarget.classList.toggle(stydles.hide);
    const inputNow = event.currentTarget.nextElementSibling as HTMLInputElement;
    inputNow.classList.toggle(stydles.hide);
    inputNow.focus();
    inputNow.select();
  };
  return (
    <TitleDiv>
      <form onSubmit={handleSubmit(changeTitle)}>
        <TitleText className="p-title" onClick={hideElement}>
          {boardId}
        </TitleText>
        <InputText
          className={stydles.hide}
          {...register("title", { value: boardId })}
          type="text"
          autoFocus
        />
      </form>
    </TitleDiv>
  );
}

export default Title;
