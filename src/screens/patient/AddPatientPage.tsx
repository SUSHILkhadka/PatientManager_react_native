import React from "react"
import { SafeAreaView, ScrollView } from "react-native"
import BasicPatientForm from "../../components/patient/BasicPatientForm"
import { safeAreaStyles } from "../login/LoginPage"
const AddPatientPage=()=>{
    return(
        <SafeAreaView style={safeAreaStyles.page}>
            <ScrollView>
    <BasicPatientForm/>
    </ScrollView>
        </SafeAreaView>)
}
export default AddPatientPage
