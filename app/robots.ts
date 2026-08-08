import type { MetadataRoute } from 'next'
import { NOINDEX, SITE_URL } from '@/lib/site'

/**
 * robots.txt (ersetzt die frühere statische Datei in /public).
 *
 * Neben den klassischen Suchmaschinen werden die Crawler der KI-/Antwort-Systeme
 * ausdrücklich erlaubt (GEO): nur wer gecrawlt werden darf, kann in ChatGPT,
 * Perplexity, Claude oder den KI-Übersichten von Google als Quelle auftauchen.
 *
 * Ausnahme: Auf einer Vorschau-Instanz (NEXT_PUBLIC_NOINDEX, siehe lib/site.ts)
 * wird stattdessen alles gesperrt – dann auch ohne Sitemap-Verweis, der eine
 * Indexierung ja gerade anstossen soll.
 */
const AI_CRAWLERS = [
    'GPTBot',            // OpenAI – Training/Index
    'OAI-SearchBot',     // ChatGPT Search
    'ChatGPT-User',      // Abruf beim Beantworten
    'ClaudeBot',         // Anthropic
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',   // Gemini / KI-Übersichten
    'Applebot-Extended',
    'meta-externalagent',
    'Bingbot',
    'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
    if (NOINDEX) {
        return { rules: [{ userAgent: '*', disallow: '/' }] }
    }

    return {
        rules: [
            { userAgent: '*', allow: '/' },
            ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
