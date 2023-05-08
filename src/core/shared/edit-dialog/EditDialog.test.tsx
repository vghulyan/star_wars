import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditDialog from './EditDialog';

describe('EditDialog', () => {
  test("should render the title with 'test'", async () => {
    const onDialogClose = () => {};

    render(
      <EditDialog
        open={true}
        title="test"
        editable={[]}
        onDialogClose={onDialogClose}
      />
    );

    expect(screen.getByText(`test`)).toBeInTheDocument();
  });
});
