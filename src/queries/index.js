export const getCategoryByTerm = async ({ queryKey }) => {
    const [page, termToSearch, sortBy] = queryKey

    const result = await fetch(`${process.env.URL_NEW_YORK_TIMES}/svc/search/v2/articlesearch.json?q=${termToSearch}&page=${page}&sort=${sortBy}&api-key=${process.env.API_KEY_NEW_YORK_TIMES}`)

    if (!result.ok) {
        throw new Error("Something went wrong fetching section, please update the page")
    }

    return result.json();
}

export const getTopStories = async () => {

    const result = await fetch(`${process.env.URL_NEW_YORK_TIMES}/svc/topstories/v2/home.json?api-key=${process.env.API_KEY_NEW_YORK_TIMES}`)

    if (!result.ok) {
        throw new Error("Something went wrong fetching stories, please update the page")
    }

    return result.json();
}

export const getSection = async ({ queryKey }) => {
    const [section] = queryKey

    const result = await fetch(`${process.env.URL_NEW_YORK_TIMES}/svc/topstories/v2/${section}.json?api-key=${process.env.API_KEY_NEW_YORK_TIMES}`)

    if (!result.ok) {
        throw new Error("Something went wrong fetching section, please update the page")
    }

    return result.json();
}