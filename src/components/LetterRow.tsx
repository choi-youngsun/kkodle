import styled from 'styled-components';
import { StyledEmptyCell, StyledLetterCell } from './LetterCard.tsx';

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 2px;
`;

type LetterRowProps = {
  inputValue: string[];
};

const generateUniqueKey = () => crypto.randomUUID();

export default function LetterRow({ inputValue }: LetterRowProps) {
  const maxLetters = 6;
  const emptyCells = Array.from({ length: maxLetters - inputValue.length });

  return (
    <div>
      <StyledRowContainer>
        {/* 입력된 글자 렌더링 */}
        {inputValue.map((letter) => (
          <StyledLetterCell key={generateUniqueKey()}>
            {letter}
          </StyledLetterCell>
        ))}
        {/* 빈 셀 렌더링 */}
        {emptyCells.map(() => (
          <StyledEmptyCell key={generateUniqueKey()} />
        ))}
      </StyledRowContainer>
    </div>
  );
}
