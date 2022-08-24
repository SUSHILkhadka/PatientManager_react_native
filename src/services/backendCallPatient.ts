import api from './api';

const routeName='patient'

/**
 *
 * @param body request's body for adding new patient
 * @returns response from server
 */
export async function addPatient(body: any): Promise<any> {
  const response = await api.post(routeName, body);
  return response.data;
}

/**
 *
 * @returns all of patients from patients table
 */
export async function readAllPatients(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}



/**
 * 
 * @param body request's body for editing existing patient
 * @param patientId for targeting specific patient from patient's table
 * @returns response from server
 */
export async function editPatient(body: any, patientId: number): Promise<any> {
  const response = await api.put(routeName + patientId, body);
  return response.data;
}

/**
 *
 * @param patientId key for targeting patient to delete from patient's table
 * @returns response from server
 */
export async function deletePatient(patientId: number): Promise<any> {
  const response = await api.delete(routeName + patientId);
  return response.data;
}
