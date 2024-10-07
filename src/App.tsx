import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ToolBar from './components/ToolBar.tsx';
import LetterRowList from './components/LetterRowList.tsx';
import Keyboard from './components/Keyboard.tsx';

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};
interface GameState {
  guesses: Letter[][];
  solution: string[];
}

const SUPABASE_URL = 'https://yznhshnhrfruzomamffs.supabase.co';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const now = dayjs().format('YY-MM-DD HH:mm');
  const [keyArray, setKeyArray] = useState<string[]>([]);

  const [wordError, setWordError] = useState<string | null>(null);
  const [timeState, setTimeState] = useState<string>(() => {
    const savedTimeState = window.localStorage.getItem('timeState');
    return savedTimeState ? JSON.parse(savedTimeState) : '';
  });
  const [gameState, setGameState] = useState<GameState>(() => {
    if (now !== timeState) {
      return { guesses: [], solution: '' };
    }
    const savedGameState = JSON.parse(
      window.localStorage.getItem('gameState') || '{}'
    );
    return savedGameState.solution
      ? savedGameState
      : { guesses: [], solution: '' };
  });

  const [guesses, setGuesses] = useState<Letter[][]>(gameState.guesses);
  const [currentAttempt, setCurrentAttempt] = useState<number>(() => {
    const savedGuesses = gameState.guesses;
    return savedGuesses ? savedGuesses.length + 1 : 1;
  }); // 현재 몇 번째 시도인지

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
    const saveGameState = () => {
      const newGameState = {
        ...gameState,
        guesses,
      };
      window.localStorage.setItem('gameState', JSON.stringify(newGameState));
    };

    saveGameState();
  }, [guesses, gameState]);

  useEffect(() => {
    // TODO: 테스트를 위해 임시 속성임, 추후 1시간 혹은 2시간으로 수정예정

    if (timeState !== now) {
      setTimeState(now);
    }
    window.localStorage.setItem('timeState', JSON.stringify(now));
    window.localStorage.setItem('gameState', JSON.stringify(gameState));
    if (timeState !== now) {
      getRandomQuestion();
    }
  }, [timeState, gameState, getRandomQuestion, now]);

  const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <StyledMainContainer>
      <ToolBar />
      <div>
        <LetterRowList
          answer={gameState.solution}
          keyArray={keyArray}
          setKeyArray={setKeyArray}
          guesses={guesses}
          setGuesses={setGuesses}
          currentAttempt={currentAttempt}
          setCurrentAttempt={setCurrentAttempt}
          wordError={wordError}
          setWordError={setWordError}
        />
      </div>
      <Keyboard
        keyArray={keyArray}
        guesses={guesses}
        setKeyArray={setKeyArray}
        setWordError={setWordError}
      />
    </StyledMainContainer>
  );
}

export default App;
