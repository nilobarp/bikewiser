import React from "react";
import { Logo, Title, Wrapper } from "./header.elements";

export function Header({ logo, title }) {
  return (
    <Wrapper>
      <Logo src={logo} alt="Bike Wiser" />
      <Title>{title}</Title>
    </Wrapper>
  );
}
