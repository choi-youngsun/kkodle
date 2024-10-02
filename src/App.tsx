import LetterRow from './components/LetterRow.tsx';
import SubmitLetterRow from './components/SubmitLetterRow.tsx';
import KeyCard from './components/KeyCard.tsx';

function App() {
  type LetterStatus = 'default' | 'ball' | 'strike';

  type Letter = {
    letter: string;
    status: LetterStatus;
  };

  const word1 = ['ㄱ', 'ㅗ', 'ㅏ', 'ㅈ', 'ㅓ', 'ㅣ'];
  const word2 = ['ㄱ', 'ㅗ', 'ㅈ', 'ㅏ', 'ㅇ'];
  const word3 = ['ㄱ', 'ㅗ', 'ㅇ'];
  const submitWord1: Letter[] = [
    { letter: 'ㄱ', status: 'default' },
    { letter: 'ㅗ', status: 'ball' },
    { letter: 'ㅏ', status: 'ball' },
    { letter: 'ㅈ', status: 'default' },
    { letter: 'ㅓ', status: 'default' },
    { letter: 'ㅣ', status: 'strike' },
  ];

  return (
    <div>
      <div>
        <LetterRow inputValue={word1} />
        <SubmitLetterRow inputValue={submitWord1} />
        <LetterRow inputValue={word2} />
        <LetterRow inputValue={word3} />
      </div>
      <div>
        <KeyCard letter="ㄱ" />
      </div>
    </div>
  );
}

export default App;
