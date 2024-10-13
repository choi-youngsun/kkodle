import styled from 'styled-components';
import { StyledColorCell } from './LetterCard.tsx';

const generateUniqueKey = () => crypto.randomUUID();

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 2px;
`;

type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

type Letter = {
  letter: string;
  status: LetterStatus;
};

type LetterRowProps = {
  inputValue: Letter[];
  isPictureMod?: boolean;
  isThemeMod?: boolean;
};

export default function SubmitLetterRow({
  inputValue,
  isPictureMod,
  isThemeMod,
}: LetterRowProps) {
  return (
    <StyledRowContainer>
      {inputValue.map((value) => (
        <StyledColorCell
          key={generateUniqueKey()}
          $cardtype={value.status}
          $isPictureMod={isPictureMod}
          $isThemeMod={isThemeMod}
        >
          {value.letter}
        </StyledColorCell>
      ))}
    </StyledRowContainer>
  );
}
