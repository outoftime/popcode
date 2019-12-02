import constant from 'lodash/constant';

export {default as performance, default as analytics} from 'lodash/noop';

class AuthProvider {
  addScope() {}
}

export const auth = Object.assign(() => ({}), {
  GithubAuthProvider: AuthProvider,
  GoogleAuthProvider: AuthProvider,
});

export const initializeApp = constant({});
