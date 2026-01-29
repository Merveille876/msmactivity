import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  url?: string;
  image?: string;
}

export default function SEO({
  title,
  description,
  keywords = "MSM ACTIVITY, Services, Projets, Conseil, Informatique",
  author = "MSM ACTIVITY",
  url = "https://www.msm-activity.com",
  image = "/og-image.png",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
