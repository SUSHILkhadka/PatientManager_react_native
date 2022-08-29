import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
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
        ToastMessage(e.response.data.message,true);
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
        <Text>This is list page</Text>
        <View style={styles.row}>
          <Text>Photo</Text>
          <Text>NAME</Text>
          <Text>EMAIL</Text>
          <Text>ADDRESS</Text>
          <Text>Special Attention</Text>
          <Text>Actions</Text>
        </View>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View>
            {displayingData.map((element: IPatient) => (
              <PatientCard {...element} key={element.patientId} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    margin: 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
});
export default PatientTable;
