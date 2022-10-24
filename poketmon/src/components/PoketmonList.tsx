import React from "react";
import styled from "@emotion/styled/macro";
import usePoketmon from "../hooks/usePoketmon";
import { ListResponse } from "../types";
import { Link } from "react-router-dom";

const Base = styled.div`
  margin-top: 24px;
`;

const Move = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  display: block;
  // 리스트 마다 간격 지정할 때 사용하면 좋을듯?
  & + & {
    margin-top: 18px;
  }
`;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  box-shadow: 6px 4px 14px 5px rgba(0, 0, 0, 0.21);
  border-radius: 12px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Image = styled.img``;

const Name = styled.p`
  margin: 0;
  padding: 0 0 0 12px;
  box-sizing: border-box;
  flex: 1 1 100%;
  color: #374151;
  // 첫번째 글자 대문자 변환
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
`;

const Index = styled.p`
  position: absolute;
  padding: 0;
  margin: 0;
  right: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #d1d5db;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 180px);
`;

const Loading = styled.img``;

// 이미지를 가져오는 함수
// 포켓몬 인덱스를 받아서 이미지 경로를 리턴해줌
const getImgUrl = (poketmonIndex: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poketmonIndex}.png`;

export default function PoketmonList() {
  const { isLoading, isError, data } = usePoketmon<ListResponse>();
  const formatNumbering = (i: number): string => {
    return `#${String(i).padStart(3, "0")}`;
  };

  return (
    <Base>
      {isLoading || isError ? (
        <LoadingWrapper>
          <Loading src="/loading.gif" alt="loading" />
        </LoadingWrapper>
      ) : (
        <List>
          {data?.data.results.map((el, i) => (
            <Move to={`/${i + 1}`} key={el.name}>
              <ListItem>
                <Image src={getImgUrl(i + 1)} />
                <Name>{el.name}</Name>
                <Index>{formatNumbering(i + 1)}</Index>
              </ListItem>
            </Move>
          ))}
        </List>
      )}
    </Base>
  );
}
