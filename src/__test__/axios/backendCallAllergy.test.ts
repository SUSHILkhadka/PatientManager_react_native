import {
  addAllergy,
  deleteAllergy,
  getAllAllergiesByPatientId,
  sentArrayOfAllergyToBackend,
  updateAllergy,
} from '../../axios/backendCallAllergy';
import {allergyList} from '../constants';
jest.mock('../../axios/api');
describe('for allergy', () => {
  const body = {
    name: 'test allergy name',
    status: 'added',
  };
  it('should get proper response when addAllergy is called with required body', async () => {
    const input = body;

    const output = await addAllergy(body);

    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get array of vaccines as dummy, when getAllAllergiesByPatientId is called', async () => {
    const output = await getAllAllergiesByPatientId(1);

    const expectedOutput = allergyList;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when updateAllergy is called with required body', async () => {
    const input = {...body, id: 1, patientId: 2};

    const output = await updateAllergy(input);

    const expectedOutput = input;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when deleteAllergy is called without any body', async () => {
    const input = body;

    const output = await deleteAllergy(1);

    const expectedOutput = 'without any body';
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when sentArrayOfAlleryToBackend is called with array of allergy of reduxstore', async () => {
    const input = allergyList;
    console.log(input);

    const output = await sentArrayOfAllergyToBackend(input, 1);

    const expectedResponseArray = [
      {...allergyList[0], status: undefined, patientId: 1},
      {...allergyList[1], status: undefined, patientId: 1},
      'without any body',
    ];
    expect(output).toEqual(expectedResponseArray);
  });
});
