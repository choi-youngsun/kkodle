import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { ToggleSwitchProps } from '../App.tsx';

interface ColorSwitchesProps {
  checked: boolean;
  handleSwitch: ToggleSwitchProps['handleSwitch'];
  mode: string;
}

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches({
  checked,
  handleSwitch,
  mode,
}: ColorSwitchesProps) {
  return (
    <div>
      <PinkSwitch
        {...label}
        checked={checked || false}
        onChange={handleSwitch(mode)}
      />
    </div>
  );
}
