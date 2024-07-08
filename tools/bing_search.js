// Update the function to return the top three URLs from Bing search results
async function bingWebSearch(query) {
    const SUBSCRIPTION_KEY = process.env.BING_API_KEY
    if (!SUBSCRIPTION_KEY) {
        throw new Error('Missing the AZURE_SUBSCRIPTION_KEY environment variable')
    }
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`
    const options = {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, options)
        const json = await response.json()

        // Extract the top three URLs from the search results
        const urls = json.webPages?.value.slice(0, 3).map((page) => page.url)
        if (urls && urls.length > 0) {
            const urlsText = urls.join(', ')
            console.log(`Top 3 URLs: ${urlsText}`)
            return urlsText // Return the top three URLs separated by commas
        } else {
            console.log('No results found')
            return 'No results found'
        }
    } catch (error) {
        console.error(error)
        return ''
    }
}

// // Example usage
const query = 'Improving Developer Experience'
bingWebSearch(query).then(console.log).catch(console.error)
