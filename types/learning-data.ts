import type { UserProfile } from "./user-profile";

/**
 * Represents a single learning activity completed by the student.
 */
export interface LearningActivity {
  id: string;
  subject: string;
  topic: string;
  type: "lesson" | "quiz" | "practice";
  score?: number; // Optional score for quizzes or assessments
  completedAt: string; // ISO date string for when the activity was completed
}

/**
 * Represents the complete data structure for a single student,
 * combining their profile, activities, and overall stats.
 */
export interface StudentData {
  profile: UserProfile;
  activities: LearningActivity[];
  stats: {
    streakDays: number;
    totalPoints: number;
  };
}
