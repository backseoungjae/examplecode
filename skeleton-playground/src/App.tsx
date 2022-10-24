import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import Skeleton from "./components/Skeleton";

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0 4 16 0;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const Placeholder: FC = () => (
  <Container>
    <ImageWrapper>
      <Skeleton width={320} height={220} />
    </ImageWrapper>
    <Info>
      <Skeleton width={150} height={29} rounded />
      <div style={{ height: "8px" }} />
      <Skeleton width={200} height={19} rounded />
    </Info>
  </Container>
);

const Item: FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="https://res.cloudinary.com/frientrip/image/upload/ar_1:1,c_fill,dpr_2,f_auto,q_auto,w_375/080680FB-0082-45C3-A9BB-E92082E07778_wjopjq" />
      </ImageWrapper>
      <Info>
        <Title>Cat talking a nap</Title>
        <Description>Hello Skeleton</Description>
      </Info>
    </Container>
  );
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Base>
      {loading
        ? Array.from({ length: 25 }).map((_, i) => <Placeholder key={i} />)
        : Array.from({ length: 25 }).map((_, i) => <Item key={i} />)}
    </Base>
  );
}

export default App;
