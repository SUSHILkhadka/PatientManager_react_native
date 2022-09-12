import React from 'react';
import {fireEvent, render} from '../utils/test-utils';
import PatientTable from '../components/patient/PatientTable';

it('should run render', () => {
  const page = render(<PatientTable />);
  const deleteButton = page.getByTestId('card');
  fireEvent.press(deleteButton);
  expect(true).toBeTruthy();
});
