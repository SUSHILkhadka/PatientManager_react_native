import {addPatient, deletePatient, editPatient, readAllPatients} from '../../axios/backendCallPatient';
import {patientArray} from '../constants';

jest.mock('../../axios/api');
const body = {
  name: 'patient',
};

it('should sent post request properly when addPatient is called', async () => {
  const input = body;

  const output = await addPatient(body);

  const expectedOutput = body;
  expect(output.data).toEqual(expectedOutput);
});

it('should sent get request properly when readAllPatients is called', async () => {
  const output = await readAllPatients();

  const expectedOutput = patientArray;
  expect(output.data).toEqual(expectedOutput);
});

it('should sent put request properly when editPatient is called', async () => {
  const output = await editPatient(body, 1);

  const expectedOutput = body;
  expect(output.data).toEqual(expectedOutput);
});

it('should sent delete request properly when editPatient is called', async () => {
  const output = await deletePatient(1);

  const expectedOutput = 'without any body';
  expect(output.data).toEqual(expectedOutput);
});
