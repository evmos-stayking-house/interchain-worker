export default () => ({
  NODE_URL: process.env.APP_ENV === 'development' ? 'https://eth.bd.evmos.dev:8545' : 'http://127.0.0.1:8545',
  BOT_PRIVATE_KEY: process.env.BOT_PRIVATE_KEY,
  STAYKING_CONTRACT_ADDRESS: process.env.STAYKING_CONTRACT_ADDRESS
});
