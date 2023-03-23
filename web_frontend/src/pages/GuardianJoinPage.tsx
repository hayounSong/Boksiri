import styled from "styled-components";
import { useState } from "react";
import { GrandFather, GrandMother } from "../assets/icons";
import { useNavigate } from "react-router-dom";

function GuardianJoinPage() {
  const [seniors, setSeniors] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <StGuardianPage>
      <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
      <StInfoText>피보호인(부모님)의 유저코드를 확인해주세요!</StInfoText>
      <StContainer>
        <StCodeInfo>👨‍👩‍👧‍👦 복실이를 사용중인 피보호인이 있으신가요?</StCodeInfo>
        <StInputContainer>
          <StInputLabel htmlFor="jb-input-text"> # </StInputLabel>
          <StNormalInput
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id="jb-input-text"
            type="tel"
            placeholder="피보호인의 유저 코드를 입력해주세요"></StNormalInput>
          <StCodeButton
            onClick={() => {
              if (code.length >= 8) {
                setCode("");
                setSeniors([...seniors, code]);
              } else {
                alert("유저코드를 제대로 입력해주세요!");
              }
            }}>
            추가
          </StCodeButton>
        </StInputContainer>
      </StContainer>
      <StCodeContainer>
        {seniors.map((senior, index) =>
          index % 2 == 0 ? (
            <StSeniorCode
              onClick={(e) =>
                setSeniors(
                  seniors.filter(
                    (senior) => senior !== (e.target as HTMLLIElement).innerHTML.split(">")[1].split("#")[1],
                  ),
                )
              }>
              <img src={GrandFather} />#{senior}
            </StSeniorCode>
          ) : (
            <StSeniorCode2
              onClick={(e) =>
                setSeniors(
                  seniors.filter(
                    (senior) => senior !== (e.target as HTMLLIElement).innerHTML.split(">")[1].split("#")[1],
                  ),
                )
              }>
              <img src={GrandMother} />#{senior}
            </StSeniorCode2>
          ),
        )}
      </StCodeContainer>
      <StJoinButton onClick={() => navigate("/#")}>다음으로</StJoinButton>
    </StGuardianPage>
  );
}
export default GuardianJoinPage;

const StGuardianPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const StWelcomMessage = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 3rem;
  margin-top: 2.5rem;
  margin-left: 2.4rem;
`;
const StInfoText = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  color: #71727a;
  margin-top: 1.2rem;
  margin-left: 2.4rem;
  margin-bottom: 2.4rem;
`;
const StCodeInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  line-height: 3.2rem;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StNormalInput = styled.input`
  width: 29.5rem;
  height: 4.8rem;
  border: 0.15rem solid;
  border-radius: 1.2rem;
  padding-left: 3rem;
  padding-right: 1.5rem;
  font-size: 1.5rem;
  background-color: white;
  border: 0.15rem solid #006ffd;
  font-family: "Pretendard-Regular";
`;
const StInputContainer = styled.div`
  width: 90%;
  display: flex;
  margin-top: 1.8rem;
  margin-bottom: 2.2rem;
`;
const StInputLabel = styled.label`
  position: relative;
  left: 2.5rem;
  font-size: 1.5rem;
  font-family: "Pretendard-Regular";
  margin-top: 1.65rem;
`;
const StCodeButton = styled.button`
  border: none;
  background: #006ffd;
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
  width: 4.6rem;
  height: 4.8rem;
  position: relative;
  right: 2rem;
  z-index: 2;
`;
const StCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30rem;
`;
const StSeniorCode = styled.div`
  width: 17rem;
  height: 4rem;
  background: #006ffd;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2.2rem;
  margin-left: 3.5rem;
`;
const StSeniorCode2 = styled.div`
  width: 17rem;
  height: 4rem;
  background: #eaf2ff;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: #006ffd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2.2rem;
  margin-left: 15rem;
`;
const StJoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32.7rem;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
`;
