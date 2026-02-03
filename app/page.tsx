import HomeContent from "./HomeContent";
import Head from "next/head";

export const metadata = {
  title: "MSM ACTIVITY - Services informatiques et conseil",
  description:
    "Développement, maintenance, formation et analyse de données pour accélérer votre transformation digitale.",
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://msmactivity.com" />
        <meta property="og:image" content="https://msmactivity.com/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://msmactivity.com/logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContent />
    </>
  );
}
