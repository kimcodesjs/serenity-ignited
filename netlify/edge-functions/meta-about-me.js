export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    const title = 'About Serenity Ignited'
    const description = 'My name is Becky, and I am a trained practitioner in Reiki, Access Consciousness, and Sound Healing. I\'m excited to join you on your journey!'
    const updatedPage = page
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `${request.url}/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/about-me" }