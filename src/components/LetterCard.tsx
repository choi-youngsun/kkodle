import styled from 'styled-components';

export const StyledCardContainer = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLetterCell = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: #ffffff;
`;

export const StyledColorCell = styled(StyledLetterCell)<{
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
  border: 2px solid rgba(255, 255, 255, 0);
`;

export const StyledEmptyCell = styled(StyledLetterCell)`
  border: 2px solid #e2e8f0;
`;
