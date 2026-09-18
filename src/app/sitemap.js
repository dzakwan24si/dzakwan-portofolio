export default function sitemap() {
  // Ganti URL ini dengan domain utama Anda jika Anda menggunakan custom domain (misalnya: https://www.domainanda.com)
  const baseUrl = 'https://dzakwansyafiq.my.id';

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
