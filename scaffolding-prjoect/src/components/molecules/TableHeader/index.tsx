import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { TabPill } from '../../atoms/Tab';
import { TabType } from '@/hooks/useContracts';

export interface TableHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSync?: () => void;
  isSyncing?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  activeTab,
  onTabChange,
  onSync,
  isSyncing = false,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, marginBottom: 3 }}>
      {/* Top Header Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h3" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
            Cash acceleration
          </Typography>
          <Tooltip title="View and manage active cash advance contracts" arrow>
            <InfoOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.disabled, cursor: 'pointer' }} />
          </Tooltip>
        </Box>

        <Box
          onClick={onSync}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.primary.light,
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <SyncIcon
            sx={{
              fontSize: 18,
              animation: isSyncing ? 'spin 1s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
          <Typography variant="body2" sx={{ color: theme.palette.primary.light, fontWeight: 600 }}>
            Sync Now
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TabPill
          label="My Contracts"
          active={activeTab === 'myContracts'}
          onClick={() => onTabChange('myContracts')}
        />
        <TabPill
          label="My Cash Kicks"
          active={activeTab === 'myCashKicks'}
          onClick={() => onTabChange('myCashKicks')}
        />
      </Box>
    </Box>
  );
};

