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
  font-family: 'Lato – Solace', 'Lato', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border-radius: 8px;
  background: #FFFFFF;
  height: 50px;

  div {
    display: flex;
    align-items: center;
  }

  border: 1px solid #AAAAAA;
  border-radius: 10px;

  fieldset {
    border: none !important;
  }
`;

const Placeholder = styled(MenuItem)`
  color: #5A5A5A;
`

const IconWrapper = styled('div')`
  margin-right: 10px;
`

interface SelectOption {
  value: string;
  name: string;
  extra?: string;
}

interface SelectDropdown {
  label: string;
  options: SelectOption[];
  icon?: any
}
export default function SelectDropdown({ label, options, icon, ...restProps }: SelectDropdown) {
  const [inputValue, setInputValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof inputValue>) => {
    const { target: { value } } = event;
    setInputValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <StyledSelect
          id="select-value"
          value={inputValue}
          onChange={handleChange}
          MenuProps={MenuProps}
          displayEmpty
          {...restProps}
        >
          <Placeholder disabled value=''>
            <IconWrapper>{icon}</IconWrapper>{label}
          </Placeholder>
          {options.map(({ value, name, extra }) => (
            
            <MenuItem
              key={name}
              value={value}
            >
              <div>{name}</div>
              {/* <div>{extra}</div> */}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}
