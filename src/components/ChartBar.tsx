import styled from 'styled-components';

const StyledBar = styled.div<{ rate: number }>`
  background-color: #2563eb;
  height: 18px;
  border-radius: 40px 0 0 40px;
  width: ${({ rate }) => (rate === 0 ? '15px' : `${rate}%`)};
`;

const StyledCount = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 13px;
  margin: 0;
`;

type ChartBarProps = {
  count: number;
  rate: number;
};

export default function ChartBar({ count, rate }: ChartBarProps) {
  return (
    <StyledBar rate={rate}>
      <StyledCount>{count}</StyledCount>
    </StyledBar>
  );
}
