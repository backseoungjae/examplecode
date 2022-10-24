// 상세페이지 최상단 포켓몬 정보
import React from "react";
import styled from "@emotion/styled/macro";
import { Color, Type } from "../types";
import { mapColorToHex, mapTypeToHex } from "../utils";

const Base = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ color }) => color};
  padding: 20px;
  box-sizing: border-box;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
`;

const ThumbnailImgWrapper = styled.div`
  width: 160px;
  margin-inline: auto;
  margin-block: 24px;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-transform: capitalize;
`;

const Index = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  opacity: 0.75;
`;

const TypeWrapper = styled.div<{ color?: string }>`
  background-color: ${({ color }) => color};
  padding: 4px;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TypeList = styled.div`
  display: flex;
  margin-top: 8px;
  ${TypeWrapper} + ${TypeWrapper} {
    margin-left: 8px;
  }
`;

const TypeInfo = styled.img`
  height: 12px;
`;

const ImgWrapper = styled.div`
  position: absolute;
  width: 288px;
  height: 288px;
  left: -96px;
  top: -96px;
  opacity: 0.75;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface IPoketmonInfo {
  id: string;
  name: string | undefined;
  types?: Array<Type>;
  color?: Color;
}

export default function PoketmonInfo({
  id,
  name,
  types,
  color,
}: IPoketmonInfo) {
  const formatNumbering = (i: string): string => {
    return `#${i.padStart(3, "0")}`;
  };
  return (
    <Base color={mapColorToHex(color?.name)}>
      <ImgWrapper>
        <Img src="/assets/pocketball.svg" alt="몬스터볼" />
      </ImgWrapper>
      <InfoWrapper>
        <Name>{name}</Name>
        <Index>{formatNumbering(id)}</Index>
      </InfoWrapper>
      <TypeList>
        {types?.map(({ type }, i) => (
          <TypeWrapper key={i} color={mapTypeToHex(type.name)}>
            <TypeInfo
              src={`/assets/${type.name}.svg`}
              alt="포켓몬 타입 이미지"
            />
          </TypeWrapper>
        ))}
      </TypeList>
      <ThumbnailImgWrapper>
        <ThumbnailImg
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="포켓몬 섬네일 이미지"
        />
      </ThumbnailImgWrapper>
    </Base>
  );
}
