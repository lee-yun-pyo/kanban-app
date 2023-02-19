import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Board = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  &:hover {
    background-color: aliceblue;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 18px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
`;

function DroppableRmCategory() {
  return (
    <>
      <Droppable type="LIST" droppableId="rmList">
        {(provided) => (
          <Board ref={provided.innerRef}>
            <div>
              <i className="fa-solid fa-trash fa-lg"></i>
              <span>리스트 삭제</span>
            </div>
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </>
  );
}

export default DroppableRmCategory;
