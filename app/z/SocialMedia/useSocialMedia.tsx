import FH from "@/classes/FH";
import { useFHPagination } from "@/hooks/useFHPagination";

export default function useSocialMedia() {
  const pagination = useFHPagination(
    FH.SocialMediaPost,
    "created_at",
    "desc",
    10,
    []
  ); // TODO: Convert to scroll

  return {
    pagination,
  };
}

export type UseSocialMedia = ReturnType<typeof useSocialMedia>;
