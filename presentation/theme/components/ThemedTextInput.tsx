import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

export const ThemedTextInput = ({ icon, ...rest }: Props) => {
  return (
    <View>
      <Text>ThemedTextInput</Text>
    </View>
  );
};
