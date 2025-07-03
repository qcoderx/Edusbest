"use client";

import { createContext, useContext, ReactNode, useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { UserProfile } from "@/types/user-profile";
import type { LearningActivity, StudentData } from "@/types/learning-data";

// Define the shape of the context data
interface DataContextType {
  studentData: StudentData | null;
  updateStudentData: (data: Partial<StudentData> | null) => void;
  addActivity: (activity: Omit<LearningActivity, "id" | "completedAt">) => void;
  resetStudentData: () => void;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create the provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [studentData, setStudentData] = useLocalStorage<StudentData | null>(
    "studentData",
    null
  );

  // Function to update parts of the student data
  const updateStudentData = useCallback(
    (data: Partial<StudentData> | null) => {
      if (data === null) {
        setStudentData(null);
      } else {
        setStudentData((prev) =>
          prev ? { ...prev, ...data } : (data as StudentData)
        );
      }
    },
    [setStudentData]
  );

  // Function to add a new learning activity
  const addActivity = useCallback(
    (activity: Omit<LearningActivity, "id" | "completedAt">) => {
      if (!studentData) return;

      const newActivity: LearningActivity = {
        ...activity,
        id: crypto.randomUUID(),
        completedAt: new Date().toISOString(),
      };

      // Award points for completing an activity
      const newPoints = studentData.stats.totalPoints + (activity.score || 10);

      const updatedData: StudentData = {
        ...studentData,
        activities: [newActivity, ...studentData.activities],
        stats: {
          ...studentData.stats,
          totalPoints: newPoints,
        },
      };
      setStudentData(updatedData);
    },
    [studentData, setStudentData]
  );

  // Function to reset all student data
  const resetStudentData = useCallback(() => {
    setStudentData(null);
    // Also clear it from localStorage directly for a full reset
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("studentData");
    }
  }, [setStudentData]);

  const value = {
    studentData,
    updateStudentData,
    addActivity,
    resetStudentData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Custom hook to use the DataContext
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
