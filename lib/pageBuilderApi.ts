/**
 * Fetch published page configuration for public use
 */
export async function fetchPublishedPageConfig(pageName: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page-builder/${pageName}/published`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });
        
        if (!res.ok) {
            console.warn(`Failed to fetch page config for ${pageName}: ${res.statusText}`);
            return null;
        }
        
        const result = await res.json();
        return result.success ? result.data : null;
    } catch (error) {
        console.error(`Error fetching page config for ${pageName}:`, error);
        return null;
    }
}
