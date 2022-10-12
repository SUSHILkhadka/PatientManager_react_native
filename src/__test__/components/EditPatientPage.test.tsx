import React from 'react';
import {act} from 'react-test-renderer';
import EditPatientPage from '../../screens/patient/EditPatientPage';
import {renderWithProvidersAndNavigation} from './customRender';

jest.mock('../../axios/api');
it('should render list vaccine page properly', async () => {
  const page = renderWithProvidersAndNavigation(<EditPatientPage />);

  await act(async () => {
    page.rerender(<EditPatientPage />);
  });
  expect(page).toMatchSnapshot();
});
