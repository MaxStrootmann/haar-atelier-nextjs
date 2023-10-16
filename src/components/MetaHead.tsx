import Head from "next/head";
import { useRouter } from "next/router";

interface MetaHeadProps {
  title?: string;
  description: string;
  featuredImage?: string;
  type?: string;
}

const siteUrl = "https://www.haaratelier-alkmaar.nl";

const MetaHead: React.FC<MetaHeadProps> = ({
  title,
  description,
  featuredImage,
  type = "article"
}) => {
  const Router = useRouter();

  return (
    <Head>
      <title>{`Haar Atelier Alkmaar${title ? ` | ${title}` : ``}`}</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />

      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {featuredImage && (
        <meta property="og:image" content={`${featuredImage}`} />
      )}
      {type && <meta property="og:type" content={type} />}
      <meta property="og:url" content={`${siteUrl}${Router.asPath}`} />
    </Head>
  );
};

export default MetaHead;
