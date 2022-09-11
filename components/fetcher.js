export default function fetcher(...urls) {
  const f = url => fetch(url).then(r => r.json())
  return Promise.all(urls.map(f))
}

