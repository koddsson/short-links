function ready() {
  return new Promise<void>(function (resolve) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      return resolve()
    }
    document.addEventListener('DOMContentLoaded', () => {
      return resolve()
    })
  })
}

function loadUrlsFromDatabase(): Record<string, string> {
  return JSON.parse(localStorage.getItem('urls') || '{}')
}

function saveUrlToDatabase(slug?: string, url?: string) {
  if (slug == undefined || slug === '' || url == undefined || url === '') return

  const urls = loadUrlsFromDatabase()
  urls[slug] = url
  localStorage.setItem('urls', JSON.stringify(urls))
}

function getURL(slug?: string): string | undefined {
  const urls = loadUrlsFromDatabase()
  if (slug && slug in urls) {
    return urls[slug]
  }
  return undefined
}

if (window.location.hash) {
  const url = getURL(window.location.hash.slice(1))
  if (url) {
    window.location.assign(url)
  }
}

await ready()

const form = document.querySelector('form')
form?.addEventListener('submit', function (event) {
  event.preventDefault()

  const slugInput = form.querySelector<HTMLInputElement>('[id=slug]')
  const urlInput = form.querySelector<HTMLInputElement>('[id=url]')

  saveUrlToDatabase(slugInput?.value, urlInput?.value)
})

const list = document.querySelector('#list')
const urls = loadUrlsFromDatabase()
for (const [slug, url] of Object.entries(urls)) {
  const link = document.createElement('a')
  link.href = url

  const li = document.createElement('li')
  li.textContent = `${slug}: ${url}`
  link.append(li)

  list?.append(link)
}
