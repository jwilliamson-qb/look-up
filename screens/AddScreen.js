import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Label, Text } from 'native-base';
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
        <View style={styles.infoHeading}>
          <Text>Thank you for supporting local businesses! To submit a new business to be added to our list, fill out the form below.</Text>
          <Text style={styles.heading}>What we look for:</Text>
          <Text style={styles.bullet}>- We contact the business to verify its ownership</Text>
          <Text style={styles.bullet}>- We verify the business's online presence</Text>
          <Text>- We verify the submitted business details</Text>
        </View>
        <Form style={styles.form}>
          <Text style={styles.sectionLabel}>Business</Text>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Name*</Label>
            <Input onChangeText={(text) => setField('6', text)} />
          </Item>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Type* (Restaurant, Cafe, Bookstore)</Label>
            <Input onChangeText={(text) => setField('15', text)} />
          </Item>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Tags (Coffee, Dessert, Second-hand)</Label>
            <Input onChangeText={(text) => setField('16', text.split(', '))} />
          </Item>
          <Text style={styles.sectionLabel}>Address</Text>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Street*</Label>
            <Input
              onChangeText={(text) => setField('8', text)}
              // returnKeyType="next"
              // onBlur={() => { this.passwordInput.passwordField.input.focus(); }}
              // onSubmitEditing={() => { this.passwordInput.passwordField.input.focus(); }}
            />
          </Item>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>City*</Label>
            <Input onChangeText={(text) => setField('10', text)} />
          </Item>
          <View style={styles.row}>
            <Item style={[styles.formItem, styles.rowItem]} floatingLabel>
              <Label style={styles.labelText}>State*</Label>
              <Input onChangeText={(text) => setField('11', text)} />
            </Item>
            <Item style={[styles.formItem, styles.rowItem]} floatingLabel>
              <Label style={styles.labelText}>Zip*</Label>
              <Input onChangeText={(text) => setField('12', text)} />
            </Item>
          </View>
          <Text style={styles.sectionLabel}>Contact</Text>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Phone Number*</Label>
            <Input keyboardType="phone-pad" onChangeText={(text) => setField('14', text)} />
          </Item>
          <Item style={styles.formItem} floatingLabel>
            <Label style={styles.labelText}>Link (URL to Website)</Label>
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
    paddingBottom: 30,
  },
  buttonStyle: {
    marginTop: 15,
    width: 155,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowItem: {
    flex: 1,
  },
  infoHeading: {
    padding: 15,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    paddingLeft: 15,
    paddingBottom: 0,
  },
  labelText: {
    fontSize: 13,
  },
  formItem: {
    marginTop: 0,
  },
});
