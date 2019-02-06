import {getGapiSync, loadAndConfigureGapi} from '../services/gapi';

async function getAuthInstance() {
  const gapi = await loadAndConfigureGapi();
  return gapi.auth2.getAuthInstance();
}

export async function signIn() {
  const gapi = getGapiSync();
  return gapi.auth2.getAuthInstance().signIn({prompt: 'select_account'});
}

export async function getCurrentUser() {
  const googleAuth = await getAuthInstance();
  return googleAuth.currentUser.get();
}

export async function isSignedIn() {
  const googleAuth = await getAuthInstance();
  return googleAuth.isSignedIn.get();
}

export async function signOut() {
  const googleAuth = await getAuthInstance();
  await googleAuth.signOut();
}
