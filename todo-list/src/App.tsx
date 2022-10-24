import React from "react";
import { RecoilRoot } from "recoil";
import Calendar from "./components/Calendar";

function App() {
  //RecoilRoot은 atom의 context를 제공하는 provider이고 recoil의 hooks를 사용하는 모든 component의 최상위에 선언이 되어야한다.
  return (
    <RecoilRoot>
      <Calendar />
    </RecoilRoot>
  );
}

export default App;
