import React from "react";
import styled from "styled-components";

const CoverStyledComponent = styled.div`
  width: 100vw;
  position: relative;
  padding: 5rem;
  padding-top: 100px;
  padding-bottom: 100px;
  max-width: 80rem;
  margin: 0 auto;
  transition: 1s;

  > div {
  }

  > div:first-child {
    left: 2.5rem;
  }

  > div:last-child {
    right: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 3rem;
  }
`;

const Cover = React.forwardRef((props, ref) => {
  return (
    <CoverStyledComponent className={props.className} ref={ref}>
      {props.children}
    </CoverStyledComponent>
  );
});

export default Cover;
