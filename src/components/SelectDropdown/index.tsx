import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { find } from "lodash";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const StyledSelect = styled(Select)`
  font-family: "Lato – Solace", "Lato", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border-radius: 8px;
  background: #ffffff;
  height: 50px;

  div {
    display: flex;
    align-items: center;
  }

  border: 1px solid #aaaaaa;
  border-radius: 10px;

  fieldset {
    border: none !important;
  }
`;

const IconWrapper = styled("div")`
  display: flex;
  margin-right: 15px;
  width: 26px;
  min-width: 26px;
  max-width: 26px;
`;

const DropdownContent = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #1d4339;
  padding: 8px;

  > div div:last-of-type {
    font-size: 14px;
    line-height: 20px;
  }

  > div div:first-of-type {
    font-size: 18px;
    line-height: 20px;
    font-weight: 700;
    margin-bottom: 3px;
  }
`;

const Value = styled("div")`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #5a5a5a;
`;

interface SelectOption {
  value: string;
  name: string;
  extra?: string;
  icon?: JSX.Element;
}

interface SelectDropdown {
  label: string;
  options: SelectOption[];
  icon?: JSX.Element;
}

export default function SelectDropdown({
  label,
  options,
  icon,
  ...restProps
}: SelectDropdown) {
  const SelectValue = ({ value }: { value: string }) => {
    const option = find(options, { value });
    return (
      <Value>
        <IconWrapper>{option?.icon || icon}</IconWrapper>
        {option?.name || label}
      </Value>
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <StyledSelect
          id="select-value"
          displayEmpty
          renderValue={(value: string) => <SelectValue value={value} />}
          {...restProps}
        >
          {options.map(({ value, name, extra, icon }) => (
            <MenuItem key={name} value={value}>
              <DropdownContent>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <div>
                  {extra ? <div>{name}</div> : <span>{name}</span>}
                  {extra && <div>{extra}</div>}
                </div>
              </DropdownContent>
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}
