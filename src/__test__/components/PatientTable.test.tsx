import React from 'react';
import {act} from 'react-test-renderer';
import ListPatientPage from '../../screens/patient/ListPatientPage';
import {renderWithProvidersAndNavigation} from './customRender';

jest.mock('../../axios/api');
it('should render list vaccine page properly', async () => {
  const page = renderWithProvidersAndNavigation(<ListPatientPage />);

  await act(async () => {
    page.rerender(<ListPatientPage />);
  });
  expect(page).toMatchSnapshot();
});
