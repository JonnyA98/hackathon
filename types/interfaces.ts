export interface DreamResponse {
  passion: string;
  challenge: string;
  impact: string;
  teamSize: number;
  timeframe: string;
  experience: string[];
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  tasks: {
    role: string;
    tasks: string[];
  }[];
}
