import { useSearchHistory, installSearchHistory } from './searchHistory';

function install(app, option) {
  installSearchHistory(app, option);
}

export default install;
export {
  useSearchHistory,
};
