import Link from "next/link";
import { linkResolver } from "../services/prismicConfiguration";

// Helper function to convert Prismic Rich Text links to Next/Link components
export function customLink(element: any, content: string, key: string) {
  return (
    <Link key={key} href={linkResolver(element.data)}>
      <a>{content}</a>
    </Link>
  );
}
