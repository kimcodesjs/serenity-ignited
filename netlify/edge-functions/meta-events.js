export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    const title = 'Events'
    const description = 'Our workshops and weekly guided meditations provide a communal and welcoming atmosphere to explore our inner and outer worlds.'
    const updatedPage = page
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `${request.url}/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/events" }