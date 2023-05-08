import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  AlertTitle,
  Stack,
  Typography,
  TextField
} from '@mui/material';
import { startCase } from 'lodash';
import { isNumeric, numberFormatter } from 'src/shared/utils/number.utils';
import useScreenSize from 'src/shared/hooks/useIsMobile';
import { QueryObj } from 'src/shared/models/url';
import { useState } from 'react';
import { AnyMap } from 'immer/dist/internal';

export interface EditDialogProps {
  editable: any;
  open: boolean;
  title: string;
  apiLoading?: boolean;
  hasErrorMsg?: string;
  onDialogClose: (editedData?: any) => void;
}

function EditDialog({
  editable,
  onDialogClose,
  open,
  title,
  apiLoading,
  hasErrorMsg
}: EditDialogProps) {
  const { isMobile } = useScreenSize();
  const [data, setData] = useState(editable);

  const onSubmitHandler = () => {
    onDialogClose(data);
  };

  const onCancelHandler = () => {
    onDialogClose(undefined);
  };

  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      onCancelHandler();
    }
  };

  // console.log('data', data)
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = data
      .map((item: QueryObj) => item.key)
      .indexOf(event.target.name);
    let tempData = data.slice();
    tempData[index] = { key: event.target.name, value: event.target.value };
    setData(tempData);
  };

  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      fullWidth
      id="edit-dialog"
      maxWidth={'sm'}
    >
      <DialogTitle>
        {hasErrorMsg && (
          <Stack width="100%" pb={2}>
            <Alert severity="error" sx={{ borderRadius: '20px' }}>
              <AlertTitle>Error</AlertTitle>
              {hasErrorMsg}
            </Alert>
          </Stack>
        )}
        {title}
      </DialogTitle>

      <DialogContent>
        <Stack direction="column">
          {data.map((res: QueryObj) => {
            return (
              <Box key={res.key} mb={1}>
                <Stack
                  direction={isMobile ? 'column' : 'row'}
                  justifyContent="start"
                  alignItems={isMobile ? 'start' : 'center'}
                >
                  <Typography variant="h6" fontWeight={300} minWidth={150}>
                    {startCase(res.key)}
                  </Typography>
                  <TextField
                    label={res.key}
                    name={res.key}
                    variant="standard"
                    fullWidth
                    value={
                      isNumeric(res.value)
                        ? (+res.value).toLocaleString()
                        : res.value
                    }
                    onChange={onChangeHandler}
                  />
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelHandler}>Cancel</Button>
        <Button onClick={onSubmitHandler}>
          {apiLoading ? 'Working...' : 'Submit'}{' '}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
