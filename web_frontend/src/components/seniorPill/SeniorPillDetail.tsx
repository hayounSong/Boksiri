import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPillInfo } from "../../core/api";

function PillDetail() {
  const [pillData, setPillData] = useState<IpillData>();

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);

  const selectPill = pillData?.medicines.find((pill) => pill.id === Number(id));

  return (
    <>
      <StHeader>
        <StPillTitle>약 세부정보</StPillTitle>
      </StHeader>
      <StBody>
        <StContentList>
          <StImg src={selectPill?.imageUrl} />
          <StContentItem>
            <StItemName>이름</StItemName>
            <StItemContent>{selectPill?.name}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>회사</StItemName>
            <StItemContent>{selectPill?.companyName}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>보관 방법</StItemName>
            <StItemContent>{selectPill?.depositMethod}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>효과 • 효능</StItemName>
            <StItemContent>{selectPill?.effect}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>투여 방법</StItemName>
            <StItemContent>{selectPill?.useMethod}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>주의 사항</StItemName>
            <StItemContent>{selectPill?.caution}</StItemContent>
          </StContentItem>
          <StLink to={"/senior/pill"}>
            <BlueButton>돌아가기</BlueButton>
          </StLink>
        </StContentList>
      </StBody>
    </>
  );
}

interface IpillData {
  medicines: [
    {
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      createdAt: string;
      dueAt: string;
      remainDay: number;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    },
  ];
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  font-size: 2rem;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
`;

const StBody = styled.div`
  font-size: 2rem;
  padding: 0 2rem 0 2rem;
`;

const StImg = styled.img`
  width: 100%;
  height: 20rem;
  padding: 2rem;
  border-radius: 5rem;
`;

const StContentList = styled.ul`
  padding: 2rem;
  border: 0.2rem solid #006ffd;
  border-radius: 2rem;
`;

const StContentItem = styled.li`
  margin: 2rem;
`;

const StItemName = styled.div`
  font-family: "Pretendard-Bold";
  color: #006ffd;
  padding-bottom: 0.5rem;
`;

const StItemContent = styled.div`
  font-size: 1.4rem;
  font-family: "Pretendard-Regular";
`;

const BlueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  margin-top: 3rem;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

export default PillDetail;
