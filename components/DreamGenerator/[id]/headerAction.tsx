"use client";

import { useParams, useRouter } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";

export default function HeaderAction() {
  const { id } = useParams();
  const router = useRouter();

  const handleDelete = () => {
    if (!id) return;

    localStorage.removeItem(`suggestion-${id}`);
    router.push("/");
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition cursor-pointer"
    >
      <TrashIcon className="w-4 h-4 mr-2" />
      Delete Project
    </button>
  );
}
