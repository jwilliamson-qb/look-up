import { USER_TOKEN } from '../secrets';

const appId = 'bqkc32ykk';
const businessesTableId = 'bqkc32ypy';
const headers = {
  'QB-Realm-Hostname': 'team.quickbase.com',
  'Authorization': `QB-USER-TOKEN ${USER_TOKEN}`,
};

export const queryBusinesses = async () => {
  try {
    const response = await fetch('https://api.quickbase.com/v1/records/query', {
      method: 'post',
      headers: new Headers({
        ...headers,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'from': businessesTableId,
        'where': '{19.EX.1}',
        'select': [
          3,
          6,
          7,
          14,
          15,
          16,
          17,
          18,
          19,
        ],
      }),
    });
    const json = await response.json();
    // console.log(json);
    // Return only the records (not the schema)
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const submitBusiness = async (data) => {
  try {
    const response = await fetch('https://api.quickbase.com/v1/records', {
      method: 'post',
      headers: new Headers({
        ...headers,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'to': businessesTableId,
        data: [data],
      }),
    });
    const json = await response.json();
    console.log(json);
    // Return the metadata
    return json.metadata;
  } catch (error) {
    console.error(error);
  }
};
