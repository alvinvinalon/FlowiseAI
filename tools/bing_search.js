const fetch = require('node-fetch')
const apiKey = $api_key
const encodedQuery = encodeURIComponent($query)
const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodedQuery}`
const options = {
    method: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json'
    }
}

try {
    const response = await fetch(url, options)
    const data = await response.json()
    const topThreeUrls = data.webPages.value.slice(0, 3).map((page) => page.url)
    return JSON.stringify(topThreeUrls)
} catch (error) {
    return ''
}
