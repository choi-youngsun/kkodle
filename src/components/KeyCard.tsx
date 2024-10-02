import styled from 'styled-components';

const StyledKeyCard = styled.div`
  width: 30px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #e2e8f0;
`;

const StyledColorKey = styled(StyledKeyCard)<{
  cardtype: 'default' | 'ball' | 'strike';
}>`
  background-color: ${({ cardtype }) => {
    switch (cardtype) {
      case 'default':
        return '#94A3B8';
      case 'ball':
        return '#EAB308';
      case 'strike':
        return '#22C55E';
      default:
        return '#94A3B8'; // 기본값 (예상치 못한 값일 때)
    }
  }};
`;

type KeyCardProps = {
  letter: string;
};

export default function KeyCard({ letter }: KeyCardProps) {
  return <StyledKeyCard>{letter}</StyledKeyCard>;
}
