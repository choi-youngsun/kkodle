import styled from 'styled-components';
import KeyCard from './KeyCard.tsx';

const KeyValue1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'];
const KeyValue2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const KeyValue3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

const StyledKeyBoardRow = styled.div`
  display: flex;
`;

export default function KeyBoard() {
  return (
    <div>
      <StyledKeyBoardRow>
        {KeyValue1.map((letter) => (
          <KeyCard letter={letter} key={letter} />
        ))}
      </StyledKeyBoardRow>
      <StyledKeyBoardRow>
        {KeyValue2.map((letter) => (
          <KeyCard letter={letter} key={letter} />
        ))}
      </StyledKeyBoardRow>
      <StyledKeyBoardRow>
        <KeyCard letter="입력" />
        {KeyValue3.map((letter) => (
          <KeyCard letter={letter} key={letter} />
        ))}
        <KeyCard letter="삭제" />
      </StyledKeyBoardRow>
    </div>
  );
}
