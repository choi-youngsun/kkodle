import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ChartBar from './ChartBar.tsx';
import CountToPercent from './CountToPercent.ts';
import CalculateResult from './CalculateResult.ts';
import useCountDownTimer from '../useCountDownTimer.ts';
import Snackbar from './SnackBar.tsx';
import useClipboardCopy from '../hooks/useClipboardCopy.ts';

// 플러그인 추가
dayjs.extend(customParseFormat);

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

export default function ChartModal() {
  const {
    isSnackBarOpen,
    snackBarMessage,
    snackBarType,
    setIsSnackBarOpen,
    handleCopyClick,
  } = useClipboardCopy();

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // 로컬 스토리지에서 데이터를 불러오는 함수
  const fetchGameResults = () => {
    const storedGameResult = localStorage.getItem('gameResults');
    if (storedGameResult) {
      try {
        setGameResults(JSON.parse(storedGameResult));
      } catch (error) {
        console.error('Failed to parse gameResult from localStorage:', error);
      }
    }
  };

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지 데이터를 불러옴
  useEffect(() => {
    fetchGameResults();
  }, []);

  const generateUniqueKey = () => crypto.randomUUID();
  const resultStats = CalculateResult(gameResults);
  // attemptCounts의 값만 배열로 변환
  const attemptCountsArray = Object.values(resultStats.attemptCounts);
  const percentageArray = CountToPercent(attemptCountsArray);

  // 새문제 남은 시간 관련 변수
  const savedTimeState = window.localStorage.getItem('timeState');
  const newTimeState = dayjs(savedTimeState, 'YYYY-MM-DD HH:mm');
  const targetTime = newTimeState
    ? dayjs(newTimeState).add(1, 'hour').format('YYYY-MM-DD HH:mm')
    : '';

  const { remainingTime } = useCountDownTimer(targetTime);

  // 로컬 스토리지에서 JSON 문자열 가져오기
  const storedData = localStorage.getItem('emojiResults');

  // JSON 파싱 및 값 추출
  let emojiGameResult = '결과 없음';
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData); // JSON 문자열을 객체로 변환
      emojiGameResult =
        `꼬들꼬들 게임 결과\n${parsedData.emojiResult}\n\nhttps://kkodlekkodle.vercel.app/` ||
        '결과 없음';
    } catch (error) {
      alert('저장된 데이터를 읽을 수 없습니다.');
      return;
    }
  }

  return (
    <>
      <Snackbar
        message={snackBarMessage}
        type={snackBarType}
        isVisible={isSnackBarOpen}
        onClose={() => setIsSnackBarOpen(false)}
      />
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
            <StyledTimeNumber>{remainingTime}</StyledTimeNumber>
          </StyledTimeSection>
          <StyledButton
            type="button"
            onClick={() => handleCopyClick(emojiGameResult)}
          >
            결과 복사
          </StyledButton>
        </StyleBottomSection>
      </StyledMainSection>
    </>
  );
}
