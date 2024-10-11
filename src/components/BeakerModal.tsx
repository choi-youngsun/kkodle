import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../App.tsx';
import { keyToJamoMap } from './keyToJamoMap.ts';
import LetterRow from './LetterRow.tsx';
import { ClickButton } from './ToolBar.tsx';

export type UserInputArray = string[];

export default function BeakerModal() {
  const MAX_LENGTH = 6;
  const [keyArray, setKeyArray] = useState<string[]>([]);

  async function insertUserInput(usetInput: UserInputArray) {
    const { error } = await supabase
      .from('user_inputs')
      .insert([{ input_array: usetInput }]);

    if (error) {
      toast('데이터 제출에 실패하였습니다.');
    } else {
      toast(`${keyArray}를 성공적으로 개발자에게 제출하였습니다.`);
    }
  }

  const onClick = () => {
    if (keyArray.length < MAX_LENGTH) return;
    insertUserInput(keyArray);
    setKeyArray([]);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'backspace') {
        setKeyArray((prevKeys) => prevKeys.slice(0, -1));
      } else if (keyToJamoMap[key]) {
        const jamo = keyToJamoMap[key];
        if (keyArray.length < MAX_LENGTH) {
          setKeyArray((prevKeys) => [...prevKeys, jamo]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyArray]);
  return (
    <div>
      <LetterRow inputValue={keyArray} />
      <ClickButton type="button" onClick={onClick}>
        제출
      </ClickButton>
    </div>
  );
}
