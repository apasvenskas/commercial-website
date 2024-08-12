import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      console.log('Logging in...');
      await handleLogin(req, res);
    } catch (error) {
      console.error('Login error:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      console.log('Handling callback...');
      await handleCallback(req, res);
      console.log('Callback successful');
    } catch (error) {
      console.error('Callback error (Token exchange failed):', error);
      res.status(error.status || 500).end(error.message);
    }
  },
  async logout(req, res) {
    try {
      console.log('Logging out...');
      await handleLogout(req, res);
    } catch (error) {
      console.error('Logout error:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
  async profile(req, res) {
    try {
      console.log('Fetching profile...');
      await handleProfile(req, res);
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(error.status || 500).end(error.message);
    }
  }
});
