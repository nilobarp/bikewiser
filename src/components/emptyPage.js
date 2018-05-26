import React from "react";
import styled from "styled-components";
import arrow from "../assets/arrow.svg";

const Arrow = styled.img`
  margin-left: -30px;
  transform: rotate(180deg);
`;

export function EmptyPage({ loading }) {
  return loading ? (
    <span>Just a moment...</span>
  ) : (
    <span>
      <div>Start by selecting a location</div>
      <Arrow src={arrow} />
    </span>
  );
}
