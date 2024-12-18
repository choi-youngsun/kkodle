type GameResult = {
  attempt: number | string;
  answer: string[];
};

type AttemptCounts = {
  [key in 1 | 2 | 3 | 4 | 5 | 6]: number; // 1에서 6까지의 숫자 리터럴 타입
};

type ResultStats = {
  totalGames: number;
  correctRate: number;
  recentStreak: number;
  maxStreak: number;
  attemptCounts: AttemptCounts;
};

export default function CalculateResult(
  gameResult: GameResult[] = []
): ResultStats {
  // 1. 전체 게임 횟수
  const totalGames = gameResult.length;

  // 2. 정답률 계산
  const correctGames = gameResult.filter(
    (result) => typeof result.attempt === 'number'
  ).length;
  const correctRate =
    totalGames > 0 ? Math.round((correctGames / totalGames) * 100) : 0;

  // 3. 최근 연속 정답 횟수
  let recentStreak = 0;
  for (let i = gameResult.length - 1; i >= 0; i--) {
    if (typeof gameResult[i].attempt === 'number') {
      recentStreak++;
    } else {
      break;
    }
  }

  // 4. 최다 연속 정답 횟수
  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < gameResult.length; i++) {
    if (typeof gameResult[i].attempt === 'number') {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  // 5. Attempt 카운트

  const attemptCounts: AttemptCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  // 각 시도 횟수에 대한 카운팅
  gameResult.forEach((result) => {
    if (
      typeof result.attempt === 'number' &&
      result.attempt >= 1 &&
      result.attempt <= 6
    ) {
      attemptCounts[result.attempt as 1 | 2 | 3 | 4 | 5 | 6]++; // 타입 단언 사용
    }
  });

  // 결과를 객체로 반환
  return {
    totalGames,
    correctRate,
    recentStreak,
    maxStreak,
    attemptCounts,
  };
}
