import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Board = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.isDraggingOver ? "violet" : "")};
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

function DroppableRemove() {
  return (
    <>
      <Droppable type="CATEGORY" droppableId="rmCategory">
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
          >
            <div>
              <i className="fa-solid fa-trash fa-lg"></i>
              <span>카테고리 삭제</span>
            </div>
          </Board>
        )}
      </Droppable>
    </>
  );
}

export default DroppableRemove;
