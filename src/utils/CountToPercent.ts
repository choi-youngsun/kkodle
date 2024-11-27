export default function CountToPercent(arr: number[]): number[] {
  const maxValue = Math.max(...arr); // 배열에서 가장 큰 값 찾기
  return arr.map((value) => (100 * value) / maxValue); // 각 값을 100 * (자기값 / 가장큰값)으로 변환
}
