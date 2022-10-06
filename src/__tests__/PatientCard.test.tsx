import React from 'react';
import {render} from '../utils/test-utils';
import {IPatient} from '../redux_toolkit/Interfaces/IPatient';
import PatientCard from '../components/patient/PatientCard';
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
    allergies: 'test',
  };
  const page = render(<PatientCard {...input} />);

  const deleteIcon = page.getAllByTestId('deleteIcon');
  const favouriteIcon = page.getAllByTestId('favouriteIcon');
  expect(favouriteIcon.length).toBe(1);
  expect(deleteIcon.length).toBe(1);
});
