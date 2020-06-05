import { USER_TOKEN } from '../secrets';

const appId = 'bqkc32ykk';
const businessesTableId = 'bqkc32ypy';
const headers = {
  'QB-Realm-Hostname': 'team.quickbase.com',
  'Authorization': `QB-USER-TOKEN ${USER_TOKEN}`,
};

const queryBusinesses = async () => {
  try {
    const response = await fetch('https://api.quickbase.com/v1/records/query', {
      method: 'post',
      headers: new Headers({
        ...headers,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'from': businessesTableId,
      }),
    });
    const json = await response.json();
    console.log(json);
    // Return only the records (not the schema)
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export default queryBusinesses;
