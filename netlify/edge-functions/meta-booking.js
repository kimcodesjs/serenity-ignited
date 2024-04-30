export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    const title = 'Book a Session'
    const description = 'Schedule an energy healing session in the modality of your choosing. We provide various ways to connect, including in person or remote sessions.'
    const updatedPage = page
        .replace(/{{META_TITLE}}/i, title)
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `${request.url}/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/booking" }