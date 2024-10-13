import styled from 'styled-components';
import KeyCard from './KeyCard.tsx';
import { updateKeyStatus } from './updateKeyStatus.ts';
import { Letter } from './LetterRowList.tsx';

type AnswerProps = {
  keyArray: string[];
  guesses: Letter[][];
  setKeyArray: React.Dispatch<React.SetStateAction<string[]>>;
  setWordError: React.Dispatch<React.SetStateAction<string | null>>;
  isThemeMod: boolean;
};

const KeyValue1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'];
const KeyValue2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const KeyValue3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
const StyledKeyboardRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;
const StyledKeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
`;

export default function Keyboard({
  keyArray,
  guesses,
  setKeyArray,
  setWordError,
  isThemeMod,
}: AnswerProps) {
  const onClickKeyboard = (letter: string) => {
    if (keyArray.length >= 6) return;
    setKeyArray((prevKeys) => [...prevKeys, letter]);
  };

  const onClickKeyboardSubmit = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
      keyCode: 13,
      which: 13,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const onClickKeyboardDelete = () => {
    setKeyArray((prevKeys) => prevKeys.slice(0, -1));
    setWordError(null);
  };

  const updateKey = updateKeyStatus(guesses);
  return (
    <StyledKeyboardRowWrapper>
      <StyledKeyboardRow>
        {KeyValue1.map((letter) => (
          <KeyCard
            letter={letter}
            key={letter}
            onClickKeyboard={() => onClickKeyboard(letter)}
            updateKey={updateKey}
            isThemeMod={isThemeMod}
          />
        ))}
      </StyledKeyboardRow>
      <StyledKeyboardRow>
        {KeyValue2.map((letter) => (
          <KeyCard
            letter={letter}
            key={letter}
            onClickKeyboard={() => onClickKeyboard(letter)}
            updateKey={updateKey}
            isThemeMod={isThemeMod}
          />
        ))}
      </StyledKeyboardRow>
      <StyledKeyboardRow>
        <KeyCard letter="입력" onClickKeyboardSubmit={onClickKeyboardSubmit} />
        {KeyValue3.map((letter) => (
          <KeyCard
            letter={letter}
            key={letter}
            onClickKeyboard={() => onClickKeyboard(letter)}
            updateKey={updateKey}
            isThemeMod={isThemeMod}
          />
        ))}
        <KeyCard letter="삭제" onClickKeyboardDelete={onClickKeyboardDelete} />
      </StyledKeyboardRow>
    </StyledKeyboardRowWrapper>
  );
}
