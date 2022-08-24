import React from 'react';
import { Button, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BasicPatientForm from "../../components/patient/BasicPatientForm";
import ListPatientSection from "../../components/patient/ListPatientSection";
import { changePage } from "../../redux_toolkit/slices/pageSlice";
import { RootState } from "../../redux_toolkit/stores/store";

const LayoutPage=()=>{

    const pageInfo = useSelector((state: RootState) => state.page);
    const dispatch = useDispatch();
    const getPage = () => {
      switch (pageInfo.page) {
        case 2:
          return <BasicPatientForm />;
        case 1:
          return <ListPatientSection />;
      }
    };

    const goToAddPatient=()=>{
        dispatch(changePage(2))
    }
    const goToListPatient=()=>{
        dispatch(changePage(1))
    }
  return(
    <View style={styles.bar}>
        <Button title="go to add patient"  onPress={goToAddPatient}/>
        <Button title="go to list all patients" onPress={goToListPatient}/>
    {getPage()}
    </View>

  )

}

const styles=StyleSheet.create({
    bar:{
        color:"red",
        backgroundColor:"green"
    }
})

export default LayoutPage;