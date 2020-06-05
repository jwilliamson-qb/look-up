import React from 'react';
import { Container, Content } from 'native-base';

export const Businesses = ({
    businesses
}) => {
    return(
        <Content>
          <List dataArray={businesses} >
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>)
}