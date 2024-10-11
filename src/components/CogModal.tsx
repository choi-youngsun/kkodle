import { ToggleSwitchProps } from '../App.tsx';
import ColorSwitches from './ColorSwitches.tsx';
import {
  CogBox,
  CogOptionInfo,
  CogOptionText,
  CogOptionTitle,
  ModalText,
  ModalTitle,
} from './TransitionsModal.tsx';

interface Props {
  isPictureMod: boolean;
  handleSwitch: ToggleSwitchProps['handleSwitch'];
  isThemeMod: boolean;
}

export default function CogModal({
  handleSwitch,
  isPictureMod,
  isThemeMod,
}: Props) {
  return (
    <>
      <ModalText>
        <ModalTitle>설정</ModalTitle>
      </ModalText>
      <CogBox>
        <CogOptionInfo>
          <CogOptionTitle>사진 찍기</CogOptionTitle>
          <CogOptionText>글자를 투명하게 만듭니다.</CogOptionText>
        </CogOptionInfo>
        <ColorSwitches
          checked={isPictureMod}
          handleSwitch={handleSwitch}
          mode="PictureMod"
        />
      </CogBox>
      <CogBox>
        <CogOptionInfo>
          <CogOptionTitle>고대비 형태</CogOptionTitle>
          <CogOptionText>
            칸의 색깔들을 더 구별하기 쉽게 바꿉니다.
          </CogOptionText>
        </CogOptionInfo>
        <ColorSwitches
          checked={isThemeMod}
          handleSwitch={handleSwitch}
          mode="ThemeMod"
        />
      </CogBox>
    </>
  );
}
