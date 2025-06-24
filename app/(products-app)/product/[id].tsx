import { ThemedTextInput } from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
const ProductScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // TODO: colocar el nombre del producto en el header
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        {/* /TODO: Mostrar los detalles del producto aquí */}
        <ThemedView style={{ marginHorizontal: 10, marginTop: 10 }}>
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />
          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemedTextInput
            placeholder="Descripción"
            multiline
            numberOfLines={4}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
