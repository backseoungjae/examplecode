import styled from "@emotion/styled/macro";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiOutlineEllipsis } from "react-icons/ai";
import usePagination from "../hooks/usePagination";

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  // 현재 페이지 전 후의 항상 표시되는 페이지 수
  siblingCount?: number;
  // 시작과 끝에서 항상 표시되는 페이지의 수
  boundaryCount?: number;
}

const Navgation = styled.nav``;

const Button = styled.button<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 0;
  margin: 0;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: normal;
  background-color: ${({ selected }) => (selected ? "#36dafa" : "#fff")};
  cursor: pointer;
  border-radius: 100%;
  /* width: 48px;
  height: 48px; */
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ccc;
    color: #fff;
  }
  &:active {
    opacity: 0.8;
  }
`;
const Item = styled.li``;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  ${Item} + ${Item} {
    margin-left: 8px;
  }
`;

export default function Pagination({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount,
  boundaryCount,
}: PaginationProps) {
  const getLabel = (item: number | string) => {
    if (typeof item === "number") {
      return item;
    } else if (item.indexOf("ellipsis") > -1) {
      return <AiOutlineEllipsis />;
    } else if (item.indexOf("prev") > -1) {
      return <GrFormPrevious />;
    } else if (item.indexOf("next") > -1) {
      return <GrFormNext />;
    }
  };

  const { items } = usePagination({
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount,
  });

  return (
    <Navgation>
      <ItemList>
        {items.map(({ key, disabled, selected, onClick, item }) => (
          <Item key={key}>
            <Button disabled={disabled} selected={selected} onClick={onClick}>
              {getLabel(item)}
            </Button>
          </Item>
        ))}
      </ItemList>
    </Navgation>
  );
}
