import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  border: thin solid #ededed;
  padding: 0.5em;
`;

export const Header = styled.h1`
  margin: 0;
  font-size: 0.9em;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
`;

export const Picker = styled.select`
  display: block;
  width: 100%;
  font-size: 1.1em;
  margin-top: 5px;
`;

export const FindButton = styled.button`
  display: block;
  width: 100%;
  height: 32px;
  border-radius: 3px;
  margin-top: 5px;
`;

export const InfoBox = styled.div`
  display: block;
  width: 100%;
  margin-top: 15px;
  text-align: justify;
  font-size: 0.9em;
  color: #777;
`;
