import { reactive, inject } from 'vue';

const key = Symbol('searchHistoryKey');
const MAX_HISTORY_RECORD = 20;

const searchHistory = reactive(['fake search history']);

searchHistory.updateHistory = (keyword) => {
  if (searchHistory.length === MAX_HISTORY_RECORD) {
    searchHistory.pop();
  }
  const idx = searchHistory.indexOf(keyword);
  if (idx !== -1) {
    searchHistory.splice(idx, 1);
  }
  searchHistory.unshift(keyword);
};

searchHistory.clearHistory = () => {
  searchHistory.splice(0);
};

searchHistory.removeHistory = (idx) => {
  searchHistory.splice(idx, 1);
};

function useSearchHistory() {
  return inject(key);
}

function installSearchHistory(app) {
  app.provide(key, searchHistory);
}

export {
  useSearchHistory,
  installSearchHistory,
};
