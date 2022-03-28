import Form, { TextInput, EmailInput } from "../../components/Form/Form";
import Validate from "../../components/Form/validationRules";
import React, {useEffect} from 'react';
import {Tabs, Tab, TabList, TabPanel} from "../../components/Tabs/Tabs";
import RegisterForm from "../../components/Form/RegisterForm";
import EmbeddedMap from "../../components/EmbeddedMap/EmbeddedMap";




export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      <EmbeddedMap />
    );
  }