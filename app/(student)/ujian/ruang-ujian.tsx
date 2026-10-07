import React from "react";
import RuangUjianScreen from "@/components/student/ujian/ruang-ujian";
import { Stack } from "expo-router";

export default function RuangUjianPageRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
          presentation: "fullScreenModal",
        }}
      />
      <RuangUjianScreen />
    </>
  );
}
