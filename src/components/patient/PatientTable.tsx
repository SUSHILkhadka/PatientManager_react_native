import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {RootState} from '../../redux_toolkit/stores/store';
import {readAllPatients} from '../../services/backendCallPatient';
import {sortBySpecialFirstThenRest} from '../../utils/sort';
import {COLOR} from '../styles/constants';
import {patientTable} from '../styles/PatientTable';
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
        const sorted = sortBySpecialFirstThenRest(response.data);
        setOriginalData(sorted);
        setDisplayingData(sorted);
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
    <View testID="card">
      <ScrollView testID="card">
        <View style={patientTable.container}>
          {loading ? (
            <View testID="loading" style={{height: 300, alignItems: 'center'}}>
              <ActivityIndicator size="large" color={COLOR.pink2} />
            </View>
          ) : (
            <View testID="table">
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
