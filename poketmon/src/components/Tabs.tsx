import React from "react";
import styled from "@emotion/styled/macro";
import { Color } from "../types";
import { mapColorToHex } from "../utils";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  & + & {
    margin-left: 16px;
  }
`;

const TabButton = styled.button<{ active?: boolean; color: string }>`
  margin: 0;
  border-radius: 8px;
  box-shadow: 6px 4px 14px 5px rgba(0, 0, 0, 0.21);
  padding: 6px 12px;
  box-sizing: border-box;
  background-color: #fff;
  border: 0;
  font-size: 16px;
  color: ${({ active, color }) => (active ? color : "#6b7280")};
`;

interface ITabs {
  tab: "about" | "stats" | "evolution";
  onClick: (tab: "about" | "stats" | "evolution") => void;
  color?: Color;
}

export default function Tabs({ tab, onClick, color }: ITabs) {
  return (
    <List>
      <ListItem onClick={() => onClick("about")}>
        <TabButton active={tab === "about"} color={mapColorToHex(color?.name)}>
          About
        </TabButton>
      </ListItem>
      <ListItem onClick={() => onClick("stats")}>
        <TabButton active={tab === "stats"} color={mapColorToHex(color?.name)}>
          Stats
        </TabButton>
      </ListItem>
      <ListItem onClick={() => onClick("evolution")}>
        <TabButton
          active={tab === "evolution"}
          color={mapColorToHex(color?.name)}
        >
          Evolution
        </TabButton>
      </ListItem>
    </List>
  );
}
