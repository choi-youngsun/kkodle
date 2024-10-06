export const updateKeyStatus = (
  arrays: {
    letter: string;
    status: 'default' | 'ball' | 'strike' | 'error';
  }[][]
) => {
  // 상태 우선순위
  const statusPriority = {
    default: 0,
    ball: 1,
    strike: 2,
    error: 0,
  };

  // 각 letter의 최고 상태를 저장할 객체
  const keyStatusMap: {
    [key: string]: 'default' | 'ball' | 'strike' | 'error';
  } = {};

  // 배열을 순회하면서 상태 업데이트
  arrays.forEach((array) => {
    array.forEach(({ letter, status }) => {
      // 현재 상태를 찾음 (없으면 default)
      const currentStatus = keyStatusMap[letter] || 'default';

      // 현재 상태와 비교하여 더 높은 우선순위의 상태로 업데이트
      if (statusPriority[status] > statusPriority[currentStatus]) {
        keyStatusMap[letter] = status;
      }
    });
  });

  // 모든 letter에 대해 default 상태를 보장
  const allLetters = new Set(arrays.flat().map(({ letter }) => letter));

  allLetters.forEach((letter) => {
    if (!keyStatusMap[letter]) {
      keyStatusMap[letter] = 'default'; // 상태가 없으면 default로 설정
    }
  });

  return keyStatusMap; // 최종적으로 각 letter의 상태 반환
};
