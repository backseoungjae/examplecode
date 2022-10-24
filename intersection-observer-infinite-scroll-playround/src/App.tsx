import React, { ReactNode, useEffect, useRef, useState } from "react";
import axios from "axios";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}

interface PassengerProps {
  children: ReactNode;
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
}

const Passenger: React.FC<PassengerProps> = ({
  isLastItem,
  onFetchMorePassengers,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // 관찰대상 ref를 넘겨주고, optionr값은 빈 값으로 넘겨줌, 선언한 값이 기본값으로 지정
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMorePassengers();
  }, [isLastItem, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{ minHeight: "100vh", display: "flex", border: "1px dashed #000" }}
    >
      {children}
    </div>
  );
};

function App() {
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getPassengers = async () => {
    const params = { size: 10, page };

    try {
      const res = await axios.get(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );
      const passengers = res.data.data;
      const isLast = res.data.totalPage === page;

      // set해주지않고 기존 값을 업핸드 방식으로 구현
      setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.log(e);
    }
  };

  // 디팬던시에 page가 변경될때마다 마지막 페이지가 아니면 getPassengers 호출
  useEffect(() => {
    !isLast && getPassengers();
  }, [page]);

  console.log("passengers ", passengers);

  return (
    <div className="App">
      {passengers.map((passenger, i) => (
        <Passenger
          key={passenger._id}
          isLastItem={passengers.length - 1 === i}
          onFetchMorePassengers={() => setPage((prev) => prev + 1)}
        >
          {passenger.name}
        </Passenger>
      ))}
    </div>
  );
}

export default App;
