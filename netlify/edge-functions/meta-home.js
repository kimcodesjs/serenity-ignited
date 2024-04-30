export default async (request, context) => {
    const response = await context.next()
    const page = await response.text()
    console.log(request.url)
    const title = 'Serenity Ignited'
    const description = 'Using energy healing modalities such as Reiki, Access Consciousness, and Sound Healing, we strive to empower people to stand in their own sovereignty. Our group meditations provide a safe space for all.'
    const updatedPage = page
        .replace(/{{META_TITLE}}/i, title)
        .replace(/{{META_DESCRIPTION}}/i, description)
        .replace(/{{OG_TITLE}}/i, title)
        .replace(/{{OG_DESCRIPTION}}/i, description)
        .replace(/{{OG_IMG_URL}}/i, `https://bug-free-couscous-pg4v75x9rvgcr97j.github.dev/og-logo.png`)
    
    return new Response(updatedPage, response)
}

export const config = { path: "/" }

