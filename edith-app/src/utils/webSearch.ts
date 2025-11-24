// Web Search Integration
export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    // Using DuckDuckGo Instant Answer API (free, no API key)
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    );
    
    if (!response.ok) throw new Error('Search failed');
    
    const data = await response.json();
    
    // Parse results
    const results: SearchResult[] = [];
    
    if (data.AbstractText) {
      results.push({
        title: data.Heading || 'Search Result',
        snippet: data.AbstractText,
        url: data.AbstractURL || ''
      });
    }
    
    // Add related topics
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      data.RelatedTopics.slice(0, 3).forEach((topic: any) => {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.split(' - ')[0] || 'Related',
            snippet: topic.Text,
            url: topic.FirstURL
          });
        }
      });
    }
    
    return results;
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}

export function summarizeSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "I couldn't find any results for that search.";
  }
  
  const mainResult = results[0];
  let summary = `Here's what I found: ${mainResult.snippet}`;
  
  if (results.length > 1) {
    summary += ` I also found ${results.length - 1} related topics.`;
  }
  
  return summary;
}
