import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput';

const RestrictedMenuItem = styled(MenuItem)(props => ({
  color: '#DC2626',
}))

const AccessSelect = styled(Select)(props => ({
  fontSize: '12px',
  // boxShadow: 'none',
  color: "#6B7280",
  "& .MuiSvgIcon-root": {
    color: "#6B7280",
  },
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  // ":hover": {
  //   color: 'red'
  // }
}))

interface CustomSelectProps {
  accessType?: string;
  handleChange?: (value: SelectChangeEvent<unknown>) => void;
}

const CustomSelect = ({ accessType = 'noAccess', handleChange = () => { } }: CustomSelectProps) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <AccessSelect
        value={accessType}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      // IconComponent={<ExpandMoreIcon color="action" />}
      >
        <MenuItem value={'fullAccess'}>Full access</MenuItem>
        <MenuItem value={'canEdit'}>Can edit</MenuItem>
        <MenuItem value={'canView'}>Can view</MenuItem>
        <RestrictedMenuItem value={'noAccess'}>No access</RestrictedMenuItem>
      </AccessSelect>
    </FormControl>
  )
}

export default CustomSelect