import styled from '@emotion/styled';
import QuestionIcon from "../assets/question.svg";
import LinkIcon from "../assets/link.svg";

const Footer = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '8px 12px',
  gap: '10px',
  background: '#F9FAFB',
  borderTop: '1px solid #E5E7EB',
  borderRadius: '0px 0px 8px 8px',
}))

const FooterText = styled('div')(props => ({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6B7280',
}))

const LinkText = styled('div')(props => ({
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#111827',
}))

const FooterItem = styled('div')(props => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}))

interface FooterContainerProps {
  hideCopyLink?: boolean;
}

const FooterContainer = ({ hideCopyLink = false }: FooterContainerProps) => {
  return (
    <Footer>
      <FooterItem>
        <img src={QuestionIcon} alt='questionIcon' width={12} height={12} />
        <FooterText>
          learn about sharing
        </FooterText>
      </FooterItem>
      {!hideCopyLink &&
        <FooterItem>
          <img src={LinkIcon} alt='questionIcon' width={12} height={12} />
          <LinkText>Copy link</LinkText>
        </FooterItem>
      }
    </Footer>
  )
}

export default FooterContainer