import styled from 'styled-components';
import ChartBar from './ChartBar.tsx';
import CountToPercent from './CountToPercent.ts';
import CalculateResult from './CalculateResult.ts';

const StyledMainSection = styled.div``;

const StyledTitle = styled.h1`
  font-size: 20px;
  text-align: center;
`;

const StyledTopSection = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 83px;
  flex-shrink: 0;
`;

const StyledNumber = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin: 0 auto;
`;

const StyledIndexNumber = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  text-align: center;
  width: 10px;
`;

const StyledText = styled.p`
  font-size: 13px;
  margin: 0 auto;
`;

const StyledChartBarSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
`;

const StyledMiddleSection = styled.div`
  margin: 0 10px;
`;

const StyledTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyleBottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 5px 0;
`;

const StyledTimeText = styled.p`
  font-size: 17px;
  margin: 0 auto;
`;

const StyledTimeNumber = styled.p`
  font-size: 18px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  border-radius: 10px;
  background-color: #4f46e5;
  flex-grow: 1;
  color: #ffffff;
  height: 40px;
  border: none;
  cursor: pointer;
`;

type GameResult = {
  attempt: number | string;
  answer: string[];
};

// 게임 누적 결과를 로컬 스토리지에서 가져옴
const storedGameResult = localStorage.getItem('gameResults');
let gameResult: GameResult[] = [];

if (storedGameResult) {
  try {
    // localStorage에서 가져온 값을 JSON.parse()로 배열로 변환
    gameResult = JSON.parse(storedGameResult);
  } catch (error) {
    console.error('Failed to parse gameResult from localStorage:', error);
  }
}

const generateUniqueKey = () => crypto.randomUUID();
const resultStats = CalculateResult(gameResult);
// attemptCounts의 값만 배열로 변환
const attemptCountsArray = Object.values(resultStats.attemptCounts);
const percentageArray = CountToPercent(attemptCountsArray);

export default function ChartModal() {
  return (
    <StyledMainSection>
      <StyledTitle>통계</StyledTitle>
      <StyledTopSection>
        <StyledColumn>
          <StyledNumber>{resultStats.totalGames}</StyledNumber>
          <StyledText>전체 도전</StyledText>
        </StyledColumn>
        <StyledColumn>
          <StyledNumber>{resultStats.correctRate}%</StyledNumber>
          <StyledText>정답률</StyledText>
        </StyledColumn>
        <StyledColumn>
          <StyledNumber>{resultStats.recentStreak}</StyledNumber>
          <StyledText>최근 연속 정답</StyledText>
        </StyledColumn>
        <StyledColumn>
          <StyledNumber>{resultStats.maxStreak}</StyledNumber>
          <StyledText>최다 연속 정답</StyledText>
        </StyledColumn>
      </StyledTopSection>
      <StyledTitle>도전 분포</StyledTitle>
      <StyledMiddleSection>
        {attemptCountsArray.map((count, index) => (
          <StyledChartBarSection key={generateUniqueKey()}>
            <StyledIndexNumber>{index + 1}</StyledIndexNumber>
            <ChartBar rate={percentageArray[index]} count={count} />
          </StyledChartBarSection>
        ))}
      </StyledMiddleSection>
      <StyleBottomSection>
        <StyledTimeSection>
          <StyledTimeText>새로운 문제까지</StyledTimeText>
          <StyledTimeNumber>09:13:30</StyledTimeNumber>
        </StyledTimeSection>
        <StyledButton type="button">결과 복사</StyledButton>
      </StyleBottomSection>
    </StyledMainSection>
  );
}
