"use client";
import { NewsFormModal } from "../news/news-modal";
export function ActivityFormModal(
  props: React.ComponentProps<typeof NewsFormModal>,
) {
  return <NewsFormModal {...props} />;
}
export default ActivityFormModal;
