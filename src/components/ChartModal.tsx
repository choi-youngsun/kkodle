import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 23px;
  text-align: center;
`;

const StyledTopSection = styled.div`
  display: flex;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ChartModal() {
  return (
    <div>
      <StyledTitle>통계</StyledTitle>
      <StyledTopSection>
        <StyledColumn>
          <p>1</p>
          <p>전체 도전</p>
        </StyledColumn>
        <StyledColumn>
          <p>100%</p>
          <p>정답률</p>
        </StyledColumn>
        <StyledColumn>
          <p>1</p>
          <p>최근 연속 정답</p>
        </StyledColumn>
        <StyledColumn>
          <p>1</p>
          <p>최다 연속 정답</p>
        </StyledColumn>
      </StyledTopSection>
      <p>도전 분포</p>
      <div>
        <div>프로그래스바</div>
        <div>프로그래스바</div>
        <div>프로그래스바</div>
        <div>프로그래스바</div>
        <div>프로그래스바</div>
        <div>프로그래스바</div>
      </div>
      <p>새로운 문제까지</p>
      <p>09:13:30</p>
      <button type="button">결과 복사</button>
    </div>
  );
}
