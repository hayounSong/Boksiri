import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { navigateIndex } from "../../core/atom";

const BottomNav = () => {
  const setNameAtom = useSetRecoilState(navigateIndex);
  const index = useRecoilValue(navigateIndex);
  const navigate = useNavigate();
  return (
    <>
      <Outlet />
      <StNavigation className="wrapper">
        <div
          onClick={() => {
            navigate("/senior/main");
            setNameAtom(0);
          }}
          className={index === 0 ? "active" : "inactive"}>
          {index === 0 ? (
            <img src={require("../../assets/icons/icon_home_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_home_off.png")} />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/senior/summary/day");
            setNameAtom(1);
          }}
          className={index === 1 ? "active" : "inactive"}>
          {index === 1 ? (
            <img src={require("../../assets/icons/icon_report_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_report_off.png")} />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/senior/meal");
            setNameAtom(2);
          }}
          className={index === 2 ? "active" : "inactive"}>
          {index === 2 ? (
            <img src={require("../../assets/icons/icon_food_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_food_off.png")} />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/senior/exercise");
            setNameAtom(3);
          }}
          className={index === 3 ? "active" : "inactive"}>
          {index === 3 ? (
            <img src={require("../../assets/icons/icon_exercise_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_exercise_off.png")} />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/senior/pill");
            setNameAtom(4);
          }}
          className={index === 4 ? "active" : "inactive"}>
          {index === 4 ? (
            <img src={require("../../assets/icons/icon_pill_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_pill_off.png")} />
          )}
        </div>
      </StNavigation>
    </>
  );
};

export default BottomNav;

const StNavigation = styled.nav`
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
  border-top: 0.2rem solid #eaf2ff;
  background-color: #ffffff;
  div {
    text-align: center;
    float: left;
    width: 20%;
    height: 7rem;
    line-height: 6rem;
  }
  img {
    margin-top: 1rem;
    width: 2rem;
    height: 2rem;
  }
  .active {
    background-color: #eaf2ff;
  }
  .inactive {
  }
`;
