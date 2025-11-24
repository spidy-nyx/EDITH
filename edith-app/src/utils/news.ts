// News Integration
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export async function getNews(category: string = 'general'): Promise<NewsArticle[]> {
  try {
    // Using NewsAPI.org (requires free API key)
    // Alternative: RSS feeds or other free news sources
    
    // For demo, using a free RSS to JSON service
    const rssUrl = getRSSFeedUrl(category);
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    );
    
    if (!response.ok) throw new Error('News fetch failed');
    
    const data = await response.json();
    
    if (data.status !== 'ok') throw new Error('News API error');
    
    return data.items.slice(0, 5).map((item: any) => ({
      title: item.title,
      description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
      url: item.link,
      source: data.feed.title,
      publishedAt: item.pubDate
    }));
  } catch (error) {
    console.error('News error:', error);
    return [];
  }
}

function getRSSFeedUrl(category: string): string {
  const feeds: { [key: string]: string } = {
    general: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    tech: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    science: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
    business: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    sports: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml'
  };
  return feeds[category] || feeds.general;
}

export function summarizeNews(articles: NewsArticle[]): string {
  if (articles.length === 0) {
    return "I couldn't fetch the latest news right now.";
  }
  
  const topStory = articles[0];
  return `Top story from ${topStory.source}: ${topStory.title}. ${articles.length - 1} more stories available.`;
}

export function formatNewsArticle(article: NewsArticle): string {
  return `📰 ${article.title}\n${article.description}\nSource: ${article.source}`;
}
