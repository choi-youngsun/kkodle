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

const SUPABASE_URL = 'https://yznhshnhrfruzomamffs.supabase.co';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};

export type SetUserInputQuestion = (input: string[]) => void;

export type ToggleSwitchProps = {
  handleSwitch: (mode: string) => () => void;
};

interface GameState {
  guesses: Letter[][];
  solution: string[];
  isDone: boolean; // 정답 여부를 저장
}

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const now = dayjs().format('YYYY-MM-DD HH:mm');
  const [modalType, setModalType] = useState('');
  const [isPictureMod, setIsPictureMod] = useState(false);
  const [isThemeMod, setIsThemeMod] = useState(false);
  const [keyArray, setKeyArray] = useState<string[]>([]);
  const [wordError, setWordError] = useState<string | null>(null);
  const [timeState, setTimeState] = useState<string>(() => {
    const savedTimeState = window.localStorage.getItem('timeState');
    return savedTimeState ? JSON.parse(savedTimeState) : '';
  });
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGameState = JSON.parse(
      window.localStorage.getItem('gameState') || '{}'
    );

    return savedGameState.solution
      ? {
          ...savedGameState,
          isDone: savedGameState.isDone ?? false, // 기존 값이 없으면 기본값으로 false 설정
        }
      : {
          guesses: [],
          solution: ['ㅇ', 'ㅏ', 'ㄴ', 'ㄴ', 'ㅕ', 'ㅇ'],
          isDone: false,
        }; // 새 게임 초기값
  });

  const [guesses, setGuesses] = useState<Letter[][]>(gameState.guesses);
  const [isDone, setIsDone] = useState(gameState.isDone);
  const [currentAttempt, setCurrentAttempt] = useState<number>(() => {
    const savedGuesses = gameState.guesses;
    return savedGuesses ? savedGuesses.length + 1 : 1;
  }); // 현재 몇 번째 시도인지
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitch = (mode: string) => () => {
    if (mode === 'PictureMod') {
      setIsPictureMod((prev) => !prev);
    } else if (mode === 'ThemeMod') {
      setIsThemeMod((prev) => !prev);
    }
  };

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
        return questionText;
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
        isDone,
      };
      window.localStorage.setItem('gameState', JSON.stringify(newGameState));
    };

    saveGameState();
  }, [guesses, gameState, isDone]);

  useEffect(() => {
    const LocalTimeState = window.localStorage.getItem('timeState');
    const newNow = dayjs();
    const savedTimeState = dayjs(timeState);
    const oneHourTimer = newNow.diff(savedTimeState, 'hour');

    // 첫 접속 시 데이터 관리 로직
    if (!LocalTimeState) {
      setTimeState(now);
      window.localStorage.setItem('timeState', JSON.stringify(now));
      const updateGameState = async () => {
        const questionText = await getRandomQuestion();
        setGameState(() => ({
          guesses: [],
          solution: questionText,
          isDone: false,
        }));
      };
      updateGameState();
    }

    // 1시간 경과 후 데이터 관리 로직
    if (oneHourTimer > 0) {
      const updateGameState = async () => {
        const questionText = await getRandomQuestion();
        setGameState(() => ({
          guesses: [],
          solution: questionText,
          isDone: false,
        }));
        setGuesses([]);
        setCurrentAttempt(1);
        window.localStorage.setItem(
          'gameState',
          JSON.stringify({
            guesses: [],
            solution: questionText,
            isDone: false,
          })
        );
        setTimeState(now);
        window.localStorage.setItem('timeState', JSON.stringify(now));
      };
      updateGameState();
    }
  }, [timeState, now, getRandomQuestion, gameState]);

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
            isDone={isDone}
            setIsDone={setIsDone}
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
