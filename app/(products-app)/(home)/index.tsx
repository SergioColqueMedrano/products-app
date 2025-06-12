import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");

  return (
    <View style={{ padding: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBolt", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText>HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
