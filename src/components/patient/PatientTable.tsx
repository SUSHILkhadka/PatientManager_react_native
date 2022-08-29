import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSelector} from 'react-redux';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {RootState} from '../../redux_toolkit/stores/store';
import {readAllPatients} from '../../services/backendCallPatient';
import {sortAscendingByNameKey} from '../../utils/sort';
import ToastMessage from '../utils/ToastMessage';
import PatientCard from './PatientCard';

const PatientTable = () => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<IPatient[]>([]);
  const [displayingData, setDisplayingData] = useState<IPatient[]>([]);

  useEffect(() => {
    setLoading(true);
    const reader = async () => {
      try {
        const response = await readAllPatients();
        const sortedAscending = sortAscendingByNameKey(response.data);
        setOriginalData(sortedAscending);
        setDisplayingData(sortedAscending);
        ToastMessage(response.message);
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message, true);
        setOriginalData([]);
        setDisplayingData([]);
      }
      setLoading(false);
    };
    reader();
  }, [pageInfo.refreshFlag]);


  return (
    <View>
      
      <ScrollView>
        <View>
          <Text>This is list page</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View>
              {displayingData.map((element: IPatient) => (
                <PatientCard {...element} key={element.patientId} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};


export default PatientTable;
