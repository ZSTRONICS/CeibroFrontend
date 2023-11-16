import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface EventWrapProps {
  key: string;
  children: ReactNode;
  creator: boolean;
}

const EventWrap: React.FC<EventWrapProps> = ({ children, key, creator }) => {
  const style = {
    backgroundColor: creator ? '#EAEAEA' : '#D3E9F9',
    marginRight: creator ? '64px' : '0',
    marginLeft: creator ? '0' : '64px',
    padding:'8px 16px 8px 16px',
    marginBottom:'16px',
  };

  return (
    <Box key={key} sx={{ ...style }}>
      {children}
    </Box>
  );
};

export default EventWrap;
