import React from 'react';
import PatientCard from '../../components/patient/PatientCard';
import {renderWithProvidersAndNavigation} from './customRender';
import {patientArray} from '../constants';
jest.useFakeTimers('legacy');
it('should run patient card', () => {
  const page = renderWithProvidersAndNavigation(<PatientCard {...patientArray[0]} />);

  const deleteIcon = page.getAllByTestId('deleteIcon');
  const favouriteIcon = page.getAllByTestId('favouriteIcon');
  expect(favouriteIcon.length).toBe(1);
  expect(deleteIcon.length).toBe(1);
  expect(page).toMatchSnapshot();
});
