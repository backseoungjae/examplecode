import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

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

function App() {
  // 스크롤을 위해서 목록 element를 ref로 지정, ref를 사용하는 이유는 scrollHeight, offsetHeight, scrollTop 등의 값들을 가져오기 위함
  const listRef = useRef<HTMLUListElement>(null);
  // 현재 페이지를 나타내주는 상수값을 표햔해주기 위해 useRef를 사용 기본 페이를 0으로 지정
  const currentPageRef = useRef<number>(0);

  // api로 passengers 목록을 지정해주는 passengers 상태를 정의 -> []로
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  // 마지막 page의 여부를 나타내는 useState
  const [isLast, setIsLast] = useState<boolean>(false);
  // scroll 하단에 와있는지 여부를 파악하는 상태값
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  // 최초 api 콜을 했을 때, Passengers를 set 해주고, scroll위치가 하단에 왔을 때, 기존 항목 밑에 passengers를 덧붙혀줘야함, 파라미터로 init을 사용하여 최초인지 아닌지 여부를 받음
  const getPassengers = async (init?: boolean) => {
    // 현재 페이지와 사이즈를 params로 넘김, (페이지에는 현재 페이지값)
    const params = { page: currentPageRef.current, size: 30 };

    try {
      const response = await axios.get(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );
      const passengers = response.data.data;
      // 마지막 페이지와 현재페이지와 같을 때 마지막 페이지라는 것을 알 수 있는 값 -> ref는 current를 사용할 수 있다.
      const isLast = response.data.totalPages === currentPageRef.current;

      // 최초 상태일 때만, setPassengers(passengers)를 해주고, 추가 호출일 경우에는 이전 항목에 더해줌
      init
        ? setPassengers(passengers)
        : setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.log(e);
    }
  };

  // throttle을 사용 이유 -> 사용하지 않았을 때는 스크롤을 내릴때마다 굉장히 많은 데이터가 찍히는 것을 확인 할수있다
  // throttle을 사용하게 되면 delay를 주어서 현저하게 적은 스크롤 이벤트가 발생하는것을 알 수 있다. 최적화...?
  const handleScroll = throttle(1000, () => {
    // 스크롤을 할때마다 element가 있으면 scrollHeight, offsetHeight, scrollTop을 가져와서 바닥까지 왔는지 여부 확인
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;

      const offset = 50;

      console.log("trigger");

      // scrollHeight, offsetHeight, scrollTop의 뺀 값이 offset보다 작으면 스크롤 위치가 하단왔다고 판단
      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  // 스크롤 위치가 하단에 왔을때 현재페이지 1 증가, 마지막 페이지가 아니라면 다시 getPassengers를 호출, 해당 useEffect는 디팬던시에 isScrollBottom, isLast값이 변경 될때마다 실행되어야 하기 떄문에 넣어줌
  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;

      !isLast && getPassengers();
    }
  }, [isScrollBottom, isLast]);

  // useEffect에서 최초 로드시에 true로 파라미터로 전달해서 호출함
  useEffect(() => {
    getPassengers(true);
  }, []);

  return (
    <div className="App">
      <ul ref={listRef} className="list" onScroll={handleScroll}>
        {passengers.map((passengers) => (
          <li className="item" key={passengers._id}>
            {passengers.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
