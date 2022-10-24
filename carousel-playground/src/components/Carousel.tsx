import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

const Base = styled.div``;

const Container = styled.div`
  position: relative;
`;

const ArrowButton = styled.button<{ pos: "left" | "right" }>`
  position: absolute;
  top: 50%;
  z-index: 1;
  padding: 8px 12px;
  font-size: 48px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: 0;
  margin: 0;
  cursor: pointer;
  ${({ pos }) =>
    pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

const CarouseListItem = styled.li<{ activeIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 200ms ease;
  > img {
    width: 100%;
    height: fit-content;
  }
`;

const NavButton = styled.button<{ isActive?: boolean }>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({ isActive }) => (isActive ? 0.3 : 0.1)};
`;

const NavItem = styled.li`
  display: inline-block;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  ${NavItem} + ${NavItem} {
    margin-left: 4px;
  }
`;

const banners = [
  "https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/F-N-1_lxubvb",
  "https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/%EB%B6%80%EC%82%B0%EC%95%BC%EA%B2%BD_%ED%94%84%EB%A6%BD2_heveon",
  "https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/F-N-2_iqoo9m",
  "https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/F-N-7_zntfpi",
  "https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/F-N-5_ee5xe0",
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 클릭 시 이동 하는 이벤트
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % banners.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);

  // 마우스 올렸을 때 캐러셀이 멈추는 이벤트
  const handleMouseEnter = () => setIsFocused(true);

  const handleMouseLeave = () => setIsFocused(false);

  const goTo = (i: number) => {
    setActiveIndex(i);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // 마우스가 포커스가 안됬을 때 저절로 이동 아니면 멈춤
    if (!isFocused) {
      intervalId = setInterval(handleNext, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Container>
        <ArrowButton pos="left" onClick={handleNext}>
          <RiArrowDropLeftLine />
        </ArrowButton>
        <CarouselList>
          {banners.map((banner, i) => (
            <CarouseListItem activeIndex={activeIndex} key={i}>
              <img src={banner} />
            </CarouseListItem>
          ))}
        </CarouselList>
        <ArrowButton pos="right" onClick={handlePrev}>
          <RiArrowDropRightLine />
        </ArrowButton>
      </Container>
      <Nav>
        {Array.from({ length: banners.length }).map((_, i) => (
          <NavItem key={i} onClick={() => goTo(i)}>
            <NavButton isActive={activeIndex === i} />
          </NavItem>
        ))}
      </Nav>
    </Base>
  );
}
