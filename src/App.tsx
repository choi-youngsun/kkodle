import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ToolBar from './components/ToolBar.tsx';
import LetterRowList from './components/LetterRowList.tsx';
import Keyboard from './components/Keyboard.tsx';
import ResultToEmoji from './components/ResultToEmoji.ts';

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};
interface GameState {
  guesses: Letter[][];
  solution: string[];
}

export type SetUserInputQuestion = (input: string[]) => void;

export type ToggleSwitchProps = {
  handleSwitch: (mode: string) => () => void;
};

const SUPABASE_URL = 'https://yznhshnhrfruzomamffs.supabase.co';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [modalType, setModalType] = useState('');
  const now = dayjs().format('YY-MM-DD HH:mm');
  const [isPictureMod, setIsPictureMod] = useState(false);
  const [isThemeMod, setIsThemeMod] = useState(false);

  const handleSwitch = (mode: string) => () => {
    if (mode === 'PictureMod') {
      setIsPictureMod((prev) => !prev);
    } else if (mode === 'ThemeMod') {
      setIsThemeMod((prev) => !prev);
    }
  };
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRandomQuestion = useCallback(
    async (attempt = 1) => {
      const MAX_ATTEMPTS = 3;
      if (attempt > MAX_ATTEMPTS) return;
      const { data, error } = await supabase.rpc('get_random_question');
      if (error) {
        toast('질문을 가져오는 중 오류 발생:');
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

  // 게임 결과를 이모지로 저장
  const emoji = ResultToEmoji(guesses);
  const emojiResult = { emojiResult: emoji };
  localStorage.setItem('emojiResults', JSON.stringify(emojiResult));

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

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        progressStyle={{ background: 'red' }}
        pauseOnFocusLoss={false}
      />
      <StyledMainContainer>
        <ToolBar
          isPictureMod={isPictureMod}
          handleSwitch={handleSwitch}
          isModalOpen={isModalOpen}
          isThemeMod={isThemeMod}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          setModalType={setModalType}
        />
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
            isPictureMod={isPictureMod}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModalType={setModalType}
            isThemeMod={isThemeMod}
          />
        </div>

        <Keyboard
          keyArray={keyArray}
          guesses={guesses}
          setKeyArray={setKeyArray}
          setWordError={setWordError}
          isThemeMod={isThemeMod}
        />
      </StyledMainContainer>
    </div>
  );
}

export default App;
