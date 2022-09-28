import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import styled from '@emotion/styled';
import FooterContainer from './FooterContainer';
import TextField from '@mui/material/TextField';
import CustomSelect from './CustomSelect';
import Chip from '@mui/material/Chip';
import { useKeyPress } from '../utility/customHooks';
import { DataItem } from './ShareButton';
import { SelectChangeEvent } from '@mui/material';

const Footer = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 12px',
  gap: '10px',
  background: '#F3F4F6',
  borderTop: '1px solid #E5E7EB',
  borderRadius: '0px 0px 8px 8px',
}))

const Search = styled(TextField)(props => ({
  width: '100%',
  // backgroundColor: '#F3F4F6',
  // border: 'none',
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
}))

const InviteButton = styled(Button)(props => ({
  backgroundColor: '#FFFFFF',
  color: '#374151',
  textTransform: 'none',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  boxShadow: 'none',
  '&:hover': {
    background: 'none',
  }
}))

const AccessAndInvite = styled('div')(props => ({
  display: 'flex',
  alignItems: 'center',
}))

const Header = styled('div')(props => ({
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  padding: '0 20px',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontStyle: 'normal',
}))

const Person = styled(ListItemText)(props => ({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#111827',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontStyle: 'normal',
}))

const MidContainer = styled('div')(props => ({
  backgroundColor: '#FFF',
  padding: '16px',
  gap: '10px',
}))

const MT2 = styled('div')(props => ({
  marginTop: '10px',
}))

const NoResultsFound = styled('div')(props => ({
  padding: '40px 20px',
}))

interface SelectDialogProps {
  onClose: (value?: DataItem) => void;
  open: boolean;
  mockData: Array<DataItem>;
}

const SelectDialog = ({ onClose, open, mockData }: SelectDialogProps) => {
  const [selected, setSelected] = useState<DataItem | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Array<DataItem>>(mockData);
  const [accessType, setAccessType] = useState<string>('noAccess');
  const enterPress = useKeyPress("Enter");
  const filteredPersons = filteredData.filter((item: DataItem) => item.type === 'person')
  const filteredGroups = filteredData.filter((item: DataItem) => item.type === 'group')
  const singleResult = filteredData.length === 1

  useEffect(() => {
    if (singleResult && enterPress) {
      setSelected(filteredData[0]);
    }
  }, [enterPress, filteredData, singleResult]);

  useEffect(() => {
    const filteredResults = mockData?.filter((item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()) || (item?.email || '').toLowerCase()?.includes(searchText.toLowerCase()))
    setFilteredData(filteredResults);
  }, [mockData, searchText]);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: DataItem) => {
    setSelected(value);
  };

  const handleDelete = () => {
    setSelected(null);
  };


  const handleInvite = () => {
    setSelected(null);
    setSearchText('');
    onClose({ ...selected, accessType });
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAccessType = (event: SelectChangeEvent<unknown>) => {
    setAccessType(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <Footer>
        {!selected
          ?
          <Search autoFocus placeholder='Search emails, names or groups' variant='outlined' id="filled-basic" value={searchText} onChange={handleChange} />
          :
          <Chip label={selected.name} onDelete={handleDelete} />
        }
        <AccessAndInvite>
          <CustomSelect accessType={accessType} handleChange={handleAccessType} />
          <InviteButton onClick={handleInvite} disabled={!selected} variant="contained">
            Invite
          </InviteButton>
        </AccessAndInvite>
      </Footer>
      {filteredData.length ?
        <MidContainer>
          {filteredPersons.length ?
            <>
              <Header>Select a person</Header>
              <List sx={{ pt: 0 }}>
                {filteredPersons.map((person: DataItem) => (
                  <ListItem sx={{ backgroundColor: singleResult ? '#F3F4F6' : 'unset' }} button onClick={() => handleListItemClick(person)} key={person.email}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600], height: 30, width: 30 }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Person primary={person.name} />
                  </ListItem>
                ))}
              </List>
            </>
            : null
          }
          {filteredPersons.length && filteredGroups.length ? <MT2 /> : null}
          {filteredGroups.length
            ?
            <>
              <Header>Select a group</Header>
              <List sx={{ pt: 0 }}>
                {filteredGroups.map((group: DataItem) => (
                  <ListItem sx={{ backgroundColor: singleResult ? '#F3F4F6' : 'unset' }} button onClick={() => handleListItemClick(group)} key={group.name}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600], height: 30, width: 30 }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Person primary={group.name} />
                  </ListItem>
                ))}
              </List>
            </>
            : null}
        </MidContainer>
        : <NoResultsFound>No results found</NoResultsFound>}
      <FooterContainer hideCopyLink />
    </Dialog>
  );
}

export default SelectDialog