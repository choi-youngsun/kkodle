import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import ToolBar from './components/ToolBar.tsx';
import LetterRow from './components/LetterRow.tsx';
import SubmitLetterRow from './components/SubmitLetterRow.tsx';
import KeyBoard from './components/KeyBoard.tsx';

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};
interface GameState {
  guesses: string[];
  solution: string;
}

const supabaseUrl = 'https://yznhshnhrfruzomamffs.supabase.co';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [timeState, setTimeState] = useState<string>(() => {
    const savedTimeState = window.localStorage.getItem('timeState');
    return savedTimeState ? JSON.parse(savedTimeState) : '';
  });
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGameState = JSON.parse(
      window.localStorage.getItem('gameState') || '{}'
    );
    return savedGameState.solution
      ? savedGameState
      : { guesses: [], solution: '' };
  });

  const getRandomQuestion = useCallback(
    async (attempt = 1) => {
      const MAX_ATTEMPTS = 3;
      if (attempt > MAX_ATTEMPTS) return;
      const { data, error } = await supabase.rpc('get_random_question');
      if (error) {
        // eslint-disable-next-line no-console
        console.error('질문을 가져오는 중 오류 발생:', error);
        return;
      }

      const questionText = data[0]?.question;
      if (questionText === gameState.solution) {
        setTimeout(() => getRandomQuestion(attempt + 1), 1000);
      } else {
        setGameState((prevState) => ({
          ...prevState,
          solution: questionText,
        }));
      }
    },
    [gameState.solution]
  );

  useEffect(() => {
    // TODO: 테스트를 위해 임시 속성임, 추후 1시간 혹은 2시간으로 수정예정
    const now = dayjs().format('YY-MM-DD HH:mm');
    if (timeState !== now) {
      setTimeState(now);
    }
    window.localStorage.setItem('timeState', JSON.stringify(now));
    window.localStorage.setItem('gameState', JSON.stringify(gameState));
    if (timeState !== now) {
      getRandomQuestion();
    }
  }, [timeState, gameState, getRandomQuestion]);

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
  const submitWord2: Letter[] = [
    { letter: 'ㄱ', status: 'error' },
    { letter: 'ㅗ', status: 'error' },
    { letter: 'ㅏ', status: 'error' },
    { letter: 'ㅈ', status: 'error' },
    { letter: 'ㅛ', status: 'error' },
    { letter: 'ㅣ', status: 'error' },
  ];

  return (
    <div>
      <ToolBar />
      <div>
        <LetterRow inputValue={word1} />
        <SubmitLetterRow inputValue={submitWord1} />
        <SubmitLetterRow inputValue={submitWord2} />
        <LetterRow inputValue={word2} />
        <LetterRow inputValue={word3} />
      </div>
      <KeyBoard />
    </div>
  );
}

export default App;
