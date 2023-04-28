import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createMember = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/team.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/team/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/team/${teamObj.firebaseKey}.json`, teamObj)
    .then(resolve)
    .catch(reject);
});

const getTeam = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/team/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const viewMemberDetails = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  createMember,
  updateTeam,
  getTeam,
  deleteMember,
  viewMemberDetails,
};
