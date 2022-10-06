import PatientTable from '../components/patient/PatientTable';
import {IPatient} from '../redux_toolkit/Interfaces/IPatient';
import {readAllPatients} from '../services/backendCallPatient';
import {render, waitFor} from '../utils/test-utils';
jest.useFakeTimers('legacy');

const defaultValue: IPatient = {
  patientId: 0,
  name: 'asdfas',
  email: 'asdfas',
  contact: 'asdfas',
  dob: 'asdfas',
  address: 'asdfas',
  photoUrl: 'asdfas',
  specialAttention: false,
};
const array = [defaultValue, defaultValue];
jest.mock('../services/backendCallPatient', () => {
  return {
    readAllPatients: async () => {
      return array;
    },
  };
});

it('should run patient table', async () => {
  var page = render(<PatientTable />);
  const loading = page.getAllByTestId('loading');
  expect(loading.length).toBe(1);
  expect(readAllPatients).toHaveBeenCalled();
  console.log('before= ', Date.now());

  await waitFor(() => {
    console.log('after= ', Date.now());
    const table = page.getAllByTestId('table');
    return expect(table.length).toBe(2);
  });
});
