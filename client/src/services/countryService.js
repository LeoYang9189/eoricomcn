let countriesCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

export async function getCountries() {
  // 如果缓存有效，直接返回缓存数据
  if (countriesCache && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return countriesCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/countries`);
    const data = await response.json();
    
    // 更新缓存
    countriesCache = data;
    lastFetchTime = Date.now();
    
    return data;
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    // 如果请求失败但有缓存，返回缓存数据
    if (countriesCache) {
      return countriesCache;
    }
    throw error;
  }
} 