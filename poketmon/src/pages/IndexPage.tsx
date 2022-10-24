import React from "react";
import styled from "@emotion/styled/macro";
import PoketmonList from "../components/PoketmonList";

const Base = styled.div`
  padding: 12px 18px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #d34f49;
  font-weight: bold;
`;

const Discription = styled.small`
  color: #6b7280;
  padding: 0;
  margin: 16px 0 0 0;
  display: block;
`;

const ImageWrapper = styled.div`
  position: fixed;
  width: 288px;
  height: 288px;
  top: 0;
  right: 0;
  opacity: 0.4;
  transform: translate(96px, -96px);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function IndexPage() {
  return (
    <Base>
      <Title>Poketmon</Title>
      <Discription>포켓몬 소개</Discription>
      <PoketmonList />
      <ImageWrapper>
        <Image src="/assets/pocketball.svg" alt="포켓몬볼" />
      </ImageWrapper>
    </Base>
  );
}
