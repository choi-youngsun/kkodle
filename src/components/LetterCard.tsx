import styled from 'styled-components';

interface ColorCellProps {
  $cardtype: 'default' | 'ball' | 'strike' | 'error';
  $isPictureMod?: boolean;
}

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

export const StyledColorCell = styled(StyledLetterCell)<ColorCellProps>`
  background-color: ${({ $cardtype }) => {
    switch ($cardtype) {
      case 'default':
        return '#94A3B8';
      case 'ball':
        return '#EAB308';
      case 'strike':
        return '#22C55E';
      case 'error':
        return '#ffffff';
      default:
        return '#94A3B8'; // 기본값 (예상치 못한 값일 때)
    }
  }};
  color: ${({ $cardtype, $isPictureMod }) => {
    // $cardtype이 'error'인 경우 색상 반환
    if ($cardtype === 'error') {
      return '#ff0000';
    }

    // $pictureMod에 따라 색상 반환
    if ($isPictureMod) {
      switch ($cardtype) {
        case 'default':
          return '#94A3B8';
        case 'ball':
          return '#EAB308';
        case 'strike':
          return '#22C55E';
        default:
          return '#94A3B8'; // 기본값 (예상치 못한 값일 때)
      }
    }

    // $pictureMod가 없을 경우 기본 색상 반환
    return 'inherit';
  }};

  border: 2px solid
    ${({ $cardtype }) =>
      $cardtype === 'error' ? '#000000' : 'rgba(255, 255, 255, 0)'};
`;

export const StyledEmptyCell = styled(StyledLetterCell)`
  border: 2px solid #e2e8f0;
`;
