export function fetchJsonData(filePath) {
  return fetch(filePath)
    .then((res) => res.json())
    .catch((e) => console.error(e));
}
