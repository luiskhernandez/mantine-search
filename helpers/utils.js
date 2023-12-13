import teams from 'mock/nba';
import _ from 'lodash'

function jsonToQueryString(json) {
  return (
    '?' +
    Object.entries(json)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  );
}
function hasNonEmptyValues(obj) {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      return true;
    }
  }
  return false;
}

function filterNonEmptyKeys(obj) {
  return _.pickBy(obj, (value) => {
    return value !== null && value !== '';
  });
}

function filterByKeys(array, searchKeys) {
  if (!hasNonEmptyValues(searchKeys)) {
    return array;
  }

  return array.filter((object) => {
    return Object.keys(filterNonEmptyKeys(searchKeys)).every((key) => {
      if (object.hasOwnProperty(key)) {
      console.log("key", key, object[key],searchKeys[key])
        return object[key].toLowerCase().includes(searchKeys[key].toLowerCase());
      }
      return false;
    });
  });
}

export function fakeAjaxRequest(_url, page, pageSize, searchParamas) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  return new Promise((resolve) => {
    const delay = Math.random() * 2000;
    const filetedData = filterByKeys(teams, searchParamas);

    setTimeout(() => {
      resolve({ results: filetedData.slice(from, to), totalRecords: filetedData.length });
    }, delay);
  });
}
