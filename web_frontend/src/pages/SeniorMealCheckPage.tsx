import { useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { checkMeal } from "../core/api/index";
import BackButton from "../components/common/BackButton";
import { BlueStarIcn, PhotoIcn } from "../assets/icons";
function SeniorMealCheckPage() {
  const imageInput = useRef<any>(null);
  const onClickImageUpload = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const [imageSrc, setImageSrc]: any = useState();
  const [uploadSts, setUploadSts] = useState(false);
  const [formData] = useState<FormData>(new FormData());
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      formData.append("image", file);
      reader.readAsDataURL(file);

      return new Promise<void>((resolve) => {
        reader.onload = () => {
          if (reader.result != null) {
            setImageSrc(reader.result); // 파일의 컨텐츠
            resolve();
          }
        };
      });
    }
  };
  const uploadImage = () => {
    setUploadSts(true);
  };
  const { data } = useQuery("uploadImage", () => checkMeal(formData), {
    enabled: !!uploadSts,
  });
  console.log(data);

  return (
    <StMealCheckPage>
      <StHeader>
        <BackButton />
        <StTitle>식단 등록하기</StTitle>
      </StHeader>
      <input accept="image/*" multiple type="file" onChange={(e) => onUpload(e)} ref={imageInput} />
      <StUploadButton onClick={onClickImageUpload}>
        <img src={PhotoIcn} />
        사진 업로드
      </StUploadButton>
      <StFoodImg width={"100%"} src={imageSrc} />
      <StFoodText>🧐 위 사진이 내가 먹은 음식이 맞나요? </StFoodText>
      <StInfoContainer>
        <StMainInfo>위 사진은 다음의 확인 과정을 거치게 됩니다.</StMainInfo>
        <StSubInfo>
          <img src={BlueStarIcn} />
          복실이가 음식 인식을 제대로 했나요?
        </StSubInfo>
        <StSubInfo>
          <img src={BlueStarIcn} />
          혹시 잘못된 사진을 올리시지는 않으셨나요?
        </StSubInfo>
        <StSubInfo>
          <img src={BlueStarIcn} />
          혹시 사진 올리기를 깜박하셨나요?
        </StSubInfo>
      </StInfoContainer>
      <StCheckButton onClick={() => uploadImage()}>분석하기</StCheckButton>
    </StMealCheckPage>
  );
}
export default SeniorMealCheckPage;

const StMealCheckPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="file"] {
    display: none;
  }
`;
const StTitle = styled.p`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 3.5rem;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;
const StUploadButton = styled.button`
  width: 25rem;
  height: 4rem;
  background-color: #006ffd;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border: 0;
  border-radius: 1.2rem;
  margin-top: 4.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 0.5rem;
    width: 2rem;
  }
`;
const StCheckButton = styled.button`
  width: 32.7rem;
  height: 4.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  bottom: 0rem;
`;
const StFoodImg = styled.img`
  max-width: 80%;
  max-height: 30rem;
  margin-top: 2.3rem;
  border-radius: 1.2rem;
`;
const StFoodText = styled.p`
  font-size: 2.3rem;
  font-family: "Pretendard-Bold";
  margin-top: 1.6rem;
  margin-bottom: 1.3rem;
`;
const StInfoContainer = styled.div`
  width: 33.2rem;
  height: 16.3rem;
  background: #f8f9fe;
  border-radius: 1.6rem;
  padding: 2.4rem;
  margin-bottom: 1.3rem;
`;
const StMainInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.63rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;
const StSubInfo = styled.p`
  img {
    margin-right: 1.2rem;
  }
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  width: 28.4rem;
  display: flex;

  margin-bottom: 1.6rem;
`;
