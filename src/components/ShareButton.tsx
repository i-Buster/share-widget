import { useState } from 'react';
import Box from '@mui/material/Box';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ShareIcon from '@mui/icons-material/Share';
import styled from '@emotion/styled';
import PlanetIcon from "../assets/Icon.svg";
import SlashIcon from "../assets/48_48.svg";
import Switch from '@mui/material/Switch';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import FooterContainer from './FooterContainer';
import SelectDialog from './SelectDialog';
import CustomSelect from './CustomSelect';
import { SelectChangeEvent } from '@mui/material';

const MainButton = styled(Button)(props => ({
  // backgroundColor: '#111827',
  // color: props.textColor,
}))

const InputButton = styled(Button)(props => ({
  backgroundColor: '#F9FAFB',
  color: '#374151',
  textTransform: 'none',
  border: '1px solid #D1D5DB',
  borderRadius: '0px 6px 6px 0px',
  boxShadow: 'none',
  '&:hover': {
    background: 'none',
  }
}))

const InviteContainer = styled(Paper)(props => ({
  background: '#FFFFFF',
  border: '1px solid #D1D5DB',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  borderRadius: '6px',
  marginTop: '20px',
}))

const FlexDiv = styled('div')(props => ({
  display: 'flex',
  justifyContent: props.justifyContent || 'unset',
  alignItems: props.alignItems || 'unset',
}))

const SwitchContainer = styled('div')(props => ({
  display: 'flex',
  padding: '10px 0',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const FlexCol = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'column',
}))

const EarthIcon = styled('img')(props => ({
  padding: '0 16px 0 8px',
}))

const P2 = styled('div')(props => ({
  padding: '0 16px',
}))

const CustomPaper = styled(Paper)(props => ({
  border: '1px solid #E5E7EB',
  boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  width: '512px',
  background: '#FFFFFF',
}))

const mockData = [{ name: 'Jon Snow', email: 'jonsnow@gmail.com', type: 'person' }, { name: 'Mark Strong', email: 'markstrong@gmail.com', type: 'person' }, { name: 'Brad Pitt', email: 'bradPitt@gmail.com', type: 'person' }, { name: 'Engineering', totalMembers: 25, type: 'group' }, { name: 'Product', totalMembers: 5, type: 'group' }, { name: 'Marketing', totalMembers: 11, type: 'group' }];

const sharedPeople = [{ name: 'Everyone at Slash', totalMembers: 8, type: 'group', accessType: 'canEdit' }];

interface ShareProps {
  buttonColor?: string;
  buttonText?: string;
}

export interface DataItem {
  name: string;
  email?: string;
  type: string;
  totalMembers?: number;
  accessType?: string;
}

export default function ShareButton({
  buttonColor = '#111827',
  buttonText = 'Share',
}: ShareProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [shareStatus, setShareStatus] = useState<Array<DataItem>>(sharedPeople);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = (value?: DataItem | null) => {
    setOpenModal(false);
    if (value) {
      setShareStatus(prevState => [...prevState, value]);
    }
  };

  const handleChange = (event: SelectChangeEvent<unknown>, item: DataItem) => {
    const targetValue = event.target.value

    setShareStatus(prevState => {
      const updatedStatus = prevState.map(el => el.name === item.name ? { ...el, accessType: targetValue } : el);
      return updatedStatus;
    });
  };

  const handleClick = (newPlacement: PopperPlacementType) => (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleSubmit = () => {
    alert('Upcoming feature - Send Invite to all')
  }

  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <CustomPaper>
              <P2>
                <SwitchContainer>
                  <FlexDiv alignItems='center'>
                    <EarthIcon src={PlanetIcon} alt='planet' width={32} height={32} />
                    <FlexCol>
                      <Typography color={'#111827'} fontWeight={400} fontSize={16}>Share to web</Typography>
                      <Typography color='#6B7280' fontWeight={400} fontSize={14}>Publish and share link with anyone</Typography>
                    </FlexCol>
                  </FlexDiv>
                  <Switch />
                </SwitchContainer>
                <Divider />
                <InviteContainer
                  component="form"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="People, emails, groups"
                    inputProps={{ 'aria-label': 'search people and groups' }}
                    onClick={handleClickOpen}
                  />

                  <InputButton onClick={handleSubmit} variant="contained">
                    Invite
                  </InputButton>
                </InviteContainer>

                {shareStatus.map((item, index) => (
                  <FlexDiv key={`${item.name}${index}`} alignItems='center' justifyContent='space-between'>
                    <FlexDiv alignItems='center'>
                      <EarthIcon src={SlashIcon} alt='logo' width={32} height={32} />
                      <FlexCol>
                        <Typography color={'#111827'} fontWeight={400} fontSize={16}>{item.name}</Typography>
                        <Typography color='#6B7280' fontWeight={400} fontSize={14}>{item.type === 'group' ? `${item.totalMembers} workspace members` : item.email}</Typography>
                      </FlexCol>
                    </FlexDiv>
                    <CustomSelect accessType={item.accessType} handleChange={(e) => handleChange(e, item)} />
                  </FlexDiv>
                ))
                }
              </P2>
              <FooterContainer />
            </CustomPaper>
          </Fade>
        )}
      </Popper>
      <Grid container justifyContent="center">
        <Grid item>
          <MainButton sx={{ backgroundColor: buttonColor }} variant="contained" endIcon={<ShareIcon />} onClick={handleClick('bottom-start')}>{buttonText}</MainButton>
        </Grid>
      </Grid>
      <SelectDialog
        open={openModal}
        onClose={handleClose}
        mockData={mockData}
      />
    </Box>
  );
}
