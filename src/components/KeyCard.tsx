import styled from 'styled-components';

interface CardProps {
  $isThemeMod: boolean;
  $cardtype: 'default' | 'ball' | 'strike' | 'error' | 'none';
}

const StyledKeyCard = styled.div`
  width: 30px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #e2e8f0;
  cursor: pointer;
  &:hover {
    background-color: #abb9c0;
  }
`;

export const SubmitDeleteKeyCard = styled(StyledKeyCard)`
  width: 50px;
`;

const StyledColorKey = styled(StyledKeyCard)<CardProps>`
  color: ${({ $cardtype }) => {
    switch ($cardtype) {
      case 'default':
        return '#fff';
      case 'ball':
        return '#fff';
      case 'strike':
        return '#fff';
      case 'none':
        return 'black';
      default:
        return 'black';
    }
  }};
  background-color: ${({ $cardtype, $isThemeMod }) => {
    if ($isThemeMod) {
      switch ($cardtype) {
        case 'default':
          return '#94A3B8';
        case 'ball':
          return '#06B6D4';
        case 'strike':
          return '#F97316';
        default:
          return '#e2e8f0'; // 기본값 (예상치 못한 값일 때)
      }
    }
    switch ($cardtype) {
      case 'default':
        return '#94A3B8';
      case 'ball':
        return '#EAB308';
      case 'strike':
        return '#22C55E';
      case 'none':
        return '#e2e8f0';
      default:
        return '#e2e8f0';
    }
  }};
`;

type KeyCardProps = {
  letter: string;
  onClickKeyboard?: (letter: string) => void;
  onClickKeyboardDelete?: () => void;
  onClickKeyboardSubmit?: () => void;
  updateKey?: { [letter: string]: 'default' | 'ball' | 'strike' | 'error' };
  isThemeMod: boolean;
};

export default function KeyCard({
  letter,
  onClickKeyboard,
  onClickKeyboardDelete,
  onClickKeyboardSubmit,
  updateKey = {},
  isThemeMod,
}: KeyCardProps) {
  const cardType = Object.prototype.hasOwnProperty.call(updateKey, letter)
    ? updateKey[letter]
    : 'none';
  if (letter === '입력') {
    return (
      <SubmitDeleteKeyCard onClick={onClickKeyboardSubmit}>
        {letter}
      </SubmitDeleteKeyCard>
    );
  }

  if (letter === '삭제') {
    return (
      <SubmitDeleteKeyCard onClick={onClickKeyboardDelete}>
        {letter}
      </SubmitDeleteKeyCard>
    );
  }
  return (
    <StyledColorKey
      $cardtype={cardType}
      onClick={() => onClickKeyboard?.(letter)}
      $isThemeMod={isThemeMod}
    >
      {letter}
    </StyledColorKey>
  );
}
