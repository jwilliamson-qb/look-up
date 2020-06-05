import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label } from 'native-base';



export default function AddScreen() {
  const [submitted, setSubmitted] = useState(false);

  const submitBusiness = () => {

    setSubmitted(true);
  }

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
            <Label>Business Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Type (Restaurant, Cafe, Bookstore)</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Tags (Coffee, Dessert, Second-hand)</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Link (URL to Website)</Label>
            <Input />
          </Item>
          <Button bordered onPress={submitBusiness} style={styles.buttonStyle} title="Submit">
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
    backgroundColor: '#fafafa',
    padding: 15,
  },
  contentContainer: {
    paddingTop: 15,
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
