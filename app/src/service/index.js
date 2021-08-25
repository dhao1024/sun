import axios from 'axios';

const DELAY = 0;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

function getCategory(query = '') {
  return axios.get(`/api/category/${query}`);
}

function getSearchRecommend() {
  // return axios.get('/api/search/recommend');

  return new Promise((resolve) => {
    setTimeout(() => { // when network delay is serious
      resolve({
        data: {
          keyword: 'fake recommend keyword',
          searchFind: ['qwert', 'aaaaa', 'zxc', '336699'],
        },
      });
    }, DELAY);
  });
}

function getSearchComplete(query = '') {
  if (getSearchComplete.cancle) getSearchComplete.cancle();

  // return axios.get(`/api/search/complete?input=${query}`, {
  //   cancelToken: new axios.CancelToken((cancle) => {
  //     getSearchComplete.cancle = cancle;
  //   }),
  // });

  return new Promise((resolve) => {
    const timer = setTimeout(() => { // when network delay is serious
      resolve({
        data: [
          `${query.toLowerCase()}`,
          `${query.toUpperCase()}`,
          `${query}-${query}`,
          `${query}-123`,
          `${query}-qwe`,
        ],
      });
    }, DELAY);
    getSearchComplete.cancle = () => {
      clearTimeout(timer);
      getSearchComplete.cancle = () => {};
    };
  });
}

function getSearchResult(query = '') {
  return axios.get(`/api/search?q=${query}`);
}

export {
  getCategory,
  getSearchRecommend,
  getSearchComplete,
  getSearchResult,
};
