import React from 'react';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import PatientCard from '../../components/patient/PatientCard';
import {renderWithProvidersAndNavigation} from './customRender';
jest.useFakeTimers('legacy');
it('should run patient card', () => {
  const input: IPatient = {
    patientId: 10,
    name: 'First',
    email: 'first',
    contact: 'test',
    dob: 'test',
    address: 'test',
    photoUrl: 'test',
    specialAttention: false,
  };
  const page = renderWithProvidersAndNavigation(<PatientCard {...input} />);

  const deleteIcon = page.getAllByTestId('deleteIcon');
  const favouriteIcon = page.getAllByTestId('favouriteIcon');
  expect(favouriteIcon.length).toBe(1);
  expect(deleteIcon.length).toBe(1);
});
