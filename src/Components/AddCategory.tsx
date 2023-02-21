import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";
import { useState } from "react";

const Wrapper = styled.div`
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

function AddCategory() {
  const [showing, setShowing] = useState(false);
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
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
    <Wrapper>
      {showing ? (
        <AddListForm onSubmit={handleSubmit(addCategory)}>
          <InputText
            {...register("list", { required: true })}
            type="text"
            placeholder="Enter list title..."
          />
          <BtnDiv>
            <SaveBtn type="submit">Add List</SaveBtn>
            <XButton type="button" onClick={() => setShowing((prev) => !prev)}>
              <i className="fa-solid fa-xmark fa-2x"></i>
            </XButton>
          </BtnDiv>
        </AddListForm>
      ) : (
        <Span
          onClick={() => setShowing((prev) => !prev)}
          className="addList-span"
        >
          <span style={{ marginRight: "5px" }}>
            <i className="fa-solid fa-plus"></i>
          </span>
          Add another list
        </Span>
      )}
    </Wrapper>
  );
}

export default AddCategory;
