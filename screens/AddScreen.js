import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import { submitBusiness } from '../services/qbapi';
import Colors from '../constants/Colors';


export default function AddScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const submit = async () => {
    if (formData['6'] && formData['6'].value &&
      formData['8'] && formData['8'].value &&
      formData['10'] && formData['10'].value &&
      formData['11'] && formData['11'].value &&
      formData['12'] && formData['12'].value &&
      formData['14'] && formData['14'].value &&
      formData['15'] && formData['15'].value) {
      const response = await submitBusiness(formData);
      if (!response.lineErrors) {
        setFormData({});
        setSubmitted(true);
      } else {
        Alert.alert('An Error Occurred');
      }
    } else {
      Alert.alert('Missing Required Fields', 'Please fill out Business Name, Address, Phone Number, and Business Type');
    }
  };

  const setField = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: {
        value,
      },
    });
  };

  if (submitted) {
    return (
      <Container style={styles.container}>
        <Content style={styles.contentContainer}>
          <Text>Thank you for your submission! It should be added to our app shortly.</Text>
          <Text style={styles.heading}>What we look for:</Text>
          <Text style={styles.bullet}>- We contact the business to verify its ownership</Text>
          <Text style={styles.bullet}>- We verify the business's online presence</Text>
          <Text style={styles.bullet}>- We verify the submitted business details</Text>
          <Button bordered onPress={() => setSubmitted(false)} style={styles.buttonStyle} title="Submit Another">
            <Text style={styles.buttonTextStyle}>Submit Another</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Content style={styles.contentContainer}>
        <Text>Thank you for supporting our local businesses! To submit a new business to be added to our list, fill out the form below.</Text>
        <Text style={styles.heading}>What we look for:</Text>
        <Text style={styles.bullet}>- We contact the business to verify its ownership</Text>
        <Text style={styles.bullet}>- We verify the business's online presence</Text>
        <Text>- We verify the submitted business details</Text>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Business Name*</Label>
            <Input onChangeText={(text) => setField('6', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Address (Street)*</Label>
            <Input onChangeText={(text) => setField('8', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Address (City)*</Label>
            <Input onChangeText={(text) => setField('10', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Address (State)*</Label>
            <Input onChangeText={(text) => setField('11', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Address (Zip)*</Label>
            <Input onChangeText={(text) => setField('12', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Phone Number*</Label>
            <Input onChangeText={(text) => setField('14', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Business Type* (Restaurant, Cafe, Bookstore)</Label>
            <Input onChangeText={(text) => setField('15', text)} />
          </Item>
          <Item floatingLabel>
            <Label>Tags (Coffee, Dessert, Second-hand)</Label>
            <Input onChangeText={(text) => setField('16', text.split(', '))} />
          </Item>
          <Item floatingLabel>
            <Label>Link (URL to Website)</Label>
            <Input onChangeText={(text) => setField('17', text)} />
          </Item>
          <Button bordered onPress={submit} style={styles.buttonStyle} title="Submit">
            <Text style={styles.buttonTextStyle}>Submit!</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fafafa',
    // borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  heading: {
    fontWeight: 'bold',
    marginVertical: 20,
  },
  bullet: {
    marginBottom: 10,
  },
  form: {
  },
  buttonStyle: {
    marginTop: 15,
    width: 155,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
  }
});
