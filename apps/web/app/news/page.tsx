import type { Metadata } from "next";
import { NewsListView } from "../../_components/news/news-list-view";

export const metadata: Metadata = {
  title: "Мэдээ | БСОН",
  description: "БСОН-ы бүх мэдээ, зарлал.",
};

export default function NewsListPage() {
  return <NewsListView />;
}
