import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {readAllPatients} from '../../axios/backendCallPatient';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {RootState} from '../../redux_toolkit/stores/store';
import {sortBySpecialFirstThenRest} from '../../utils/sort.utils';
import {COLOR} from '../styles/constants';
import {patientTable} from '../styles/PatientTable';
import ToastMessage from '../../utils/ToastMessage.utils';
import PatientCard from './PatientCard';

const PatientTable = () => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<IPatient[]>([]);
  const [displayingData, setDisplayingData] = useState<IPatient[]>([]);

  const navigation = useNavigation();
  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const reader = async () => {
      try {
        const response = await readAllPatients();
        if (isMounted) {
          const sorted = sortBySpecialFirstThenRest(response.data);
          setOriginalData(sorted);
          setDisplayingData(sorted);
        }
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message, true);
        setOriginalData([]);
        setDisplayingData([]);
      }
      setLoading(false);
    };
    reader();

    return () => {
      isMounted = false;
    };
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
