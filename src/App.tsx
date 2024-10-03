import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ToolBar from './components/ToolBar.tsx';
import KeyBoard from './components/KeyBoard.tsx';
import LetterRowList from './components/LetterRowList.tsx';

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

  const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <StyledMainContainer>
      <ToolBar />
      <div>
        <LetterRowList />
      </div>
      <KeyBoard />
    </StyledMainContainer>
  );
}

export default App;
