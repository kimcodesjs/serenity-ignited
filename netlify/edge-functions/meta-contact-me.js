export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    const title = 'Contact Serenity Ignited'
    const description = 'Struggling to find what you need, or have questions? I\'m looking forward to hearing from you!'
    const updatedPage = page
        .replace(/{{META_TITLE}}/i, title)
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `${request.url}/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/contact-me" }