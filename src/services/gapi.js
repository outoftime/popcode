import loadjs from 'loadjs';
import once from 'lodash-es/once';

import config from '../config';
import ExtendableError from '../util/ExtendableError';

export const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students',
  'https://www.googleapis.com/auth/classroom.coursework.me',
];

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'];

class LoadError extends ExtendableError {}

let isGapiLoadedAndConfigured = false;

const loadGapi = once(async() => new Promise((resolve, reject) => {
  loadjs('https://apis.google.com/js/client.js', {
    success() {
      resolve(window.gapi);
    },
    error(failedPaths) {
      reject(new LoadError(`Failed to load ${failedPaths.join(', ')}`));
    },
    numRetries: 16,
  });
}));

export const loadAndConfigureGapi = once(async() => {
  const gapi = await loadGapi();
  await new Promise((resolve, reject) => {
    gapi.load('client:auth2', {
      callback: () => {
        resolve(gapi);
      },
      onerror: reject,
      timeout: 5000,
      ontimeout: () => {
        reject(new Error('Timed out'));
      },
    });
  });

  await gapi.client.init({
    apiKey: config.firebaseApiKey,
    discoveryDocs: DISCOVERY_DOCS,
  });

  isGapiLoadedAndConfigured = true;

  return gapi;
});

export async function getCurrentUserProfile() {
  const gapi = await loadAndConfigureGapi();
  const auth = gapi.auth2.getAuthInstance();
  const user = auth.currentUser.get();
  const profile = user.getBasicProfile();
  return profile;
}

export function getGapiSync() {
  if (!isGapiLoadedAndConfigured) {
    throw new Error(
      'Attempted to synchronously access `gapi` before it was loaded',
    );
  }

  return window.gapi;
}

export async function authorize() {
  const gapi = getGapiSync();
  const authResponse = await new Promise((resolve, reject) => {
    gapi.auth2.authorize(
      {
        client_id: config.firebaseClientId,
        prompt: 'select_account',
        response_type: 'id_token token',
        scope: SCOPES.join(' '),
      },
      (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      },
    );
  });
  gapi.client.setToken(authResponse);
  debugger;
  return authResponse;
}
