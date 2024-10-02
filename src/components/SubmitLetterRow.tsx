import styled from 'styled-components';
import { StyledColorCell } from './LetterCard.tsx';

const generateUniqueKey = () => crypto.randomUUID();

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 2px;
`;

type LetterStatus = 'default' | 'ball' | 'strike';

type Letter = {
  letter: string;
  status: LetterStatus;
};

type LetterRowProps = {
  inputValue: Letter[]; // 수정된 타입
};

export default function SubmitLetterRow({ inputValue }: LetterRowProps) {
  return (
    <StyledRowContainer>
      {inputValue.map((value) => (
        <StyledColorCell key={generateUniqueKey()} cardtype={value.status}>
          {value.letter}
        </StyledColorCell>
      ))}
    </StyledRowContainer>
  );
}
