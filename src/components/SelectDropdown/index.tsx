import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledSelect = styled(Select)`
  border-radius: 8px;
`;

interface SelectOption {
  value: string;
  name: string;
  extra?: string;
}

export default function SelectDropdown({ label, options, ...restProps }: { label: string, options: SelectOption[] }) {
  const [inputValue, setInputValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof inputValue>) => {
    const { target: { value } } = event;
    setInputValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <StyledSelect
          id="select-value"
          value={inputValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
          {...restProps}
        >
          {options.map(({ value, name, extra }) => (
            <MenuItem
              key={name}
              value={value}
            >
              <div>{name}</div>
              <div>{extra}</div>
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}
