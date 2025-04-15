import { ProjectSuggestionDisplay } from "@/components/DreamGenerator/[id]/ProjectSuggestionDisplay";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;

  console.log("ProjectPage ID:", id);

  return <ProjectSuggestionDisplay id={id} />;
}
