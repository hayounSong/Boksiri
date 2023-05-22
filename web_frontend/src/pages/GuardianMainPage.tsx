import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { getSeniorData, postSeniorCode } from "../core/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function GuardianMainPage() {
  const { data } = useQuery("senior", () => getSeniorData());
  const { mutate } = useMutation(postSeniorCode);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const onAddSubmit = () => {
    mutate(Number(code), {
      onSuccess: () => {
        alert("성공적으로 추가했습니다!");
        setIsOpen(false);
        setCode("");
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>복실이</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/main" />
      </Helmet>
      <StGuardianMainPage>
        <StTitle>관리중인 시니어</StTitle>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper">
          {data?.data.map((senior: any) => (
            <SwiperSlide>
              <StSeniorCard>
                <StTag>관제중</StTag>
                <StInfoContainer>
                  {senior.gender === "MALE" ? (
                    <img src={require("../assets/images/img_old-man.png")} alt="senior" className="image" />
                  ) : (
                    <img src={require("../assets/images/img_old-woman.png")} alt="senior" className="image" />
                  )}

                  <StSeniorName>{senior.name}</StSeniorName>
                  <StSeniorDate>{senior.birthday} 출생</StSeniorDate>
                  <StCardText>
                    🔐 유저 코드 : <StCardTag># {senior.kakaoAccountId}</StCardTag>
                  </StCardText>
                  <StCardText>{senior.gender === "MALE" ? <>🙆‍♂️ 남성</> : <>🙆‍♀️ 여성</>}</StCardText>
                  <StCardText>📏 키: {senior.height}cm</StCardText>
                  <StCardText>📝 현재 체중: {senior.weight}kg</StCardText>
                </StInfoContainer>
                <StCheckButton onClick={() => navigate("/guardian/" + senior.kakaoAccountId + "/main")}>
                  자세히 보기
                </StCheckButton>
              </StSeniorCard>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <StSeniorCard>
              <StInfoContainer>
                <StAddTitle>시니어 추가하기</StAddTitle>
                <div className="row">
                  <img src={require("../assets/images/img_old-man.png")} className="image2" />
                  <img src={require("../assets/images/img_old-woman.png")} className="image2" />
                </div>
                {isOpen ? (
                  <StCenterContainer>
                    <StCodeInfo>유저 코드를 입력해주세요</StCodeInfo>
                    <StInputContainer>
                      <StInputLabel htmlFor="jb-input-text"> # </StInputLabel>
                      <StNormalInput
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        id="jb-input-text"
                        type="number"
                        placeholder="8자리 숫자 코드"></StNormalInput>
                    </StInputContainer>
                    <StCheckButton
                      onClick={() => {
                        onAddSubmit();
                      }}>
                      추가하기
                    </StCheckButton>
                  </StCenterContainer>
                ) : (
                  <StCheckButton onClick={() => setIsOpen(true)}>추가하기</StCheckButton>
                )}
              </StInfoContainer>
            </StSeniorCard>
          </SwiperSlide>
        </Swiper>
      </StGuardianMainPage>
    </motion.div>
  );
}

const StGuardianMainPage = styled.div`
  .swiper {
    width: 30rem;
    height: 55rem;
    border-radius: 1rem;
    z-index: 1;
    position: relative;
  }
  img {
    width: 30rem;
    height: 55rem;
    border-radius: 1rem;
  }
  .swiper-slide {
    margin-top: 3rem;
    border-radius: 1rem;
  }
`;

const StSeniorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fe;
  width: 30rem;
  height: 55rem;
  border-radius: 2rem;
  z-index: 1;
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.8rem;
  text-align: center;
  align-self: center;
  margin-top: 5rem;
`;

const StSeniorName = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 2.2rem;
`;

const StAddTitle = styled(StSeniorName)`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const StSeniorDate = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
  color: #71727a;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
`;
const StCardText = styled.p`
  font-size: 1.4rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1rem;
`;
const StCheckButton = styled.button`
  width: 25rem;
  height: 3.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  margin-bottom: 2rem;
`;
const StInfoContainer = styled.div`
  width: 25rem;
  margin-top: 12rem;
  margin-bottom: 1rem;
  .image {
    width: 13rem;
    height: 13rem;
    margin-bottom: 2rem;
  }
  .image2 {
    width: 11rem;
    height: 11rem;
    margin-bottom: 2rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5rem;
    /* margin-bottom: 5rem; */
  }
`;
const StCardTag = styled.span`
  width: 5rem;
  height: 1rem;
  background-color: #006ffd;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-radius: 1rem;
  color: white;
  font-family: "Pretendard-Bold";
`;
const StTag = styled.div`
  font-size: 1.4rem;
  width: 7rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #006ffd;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-radius: 1rem;
  color: white;
  font-family: "Pretendard-Bold";
  position: relative;
  left: 10rem;
  top: 2rem;
`;
const StCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StCodeInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  line-height: 3.2rem;
  text-align: center;
`;
const StInputContainer = styled.div`
  width: 100%;
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
