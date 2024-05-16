export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    const title = 'Log In'
    const description = 'Log in or create an account to book and manage your healing sessions and attend events!'
    const updatedPage = page
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `${request.url}/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/login" }