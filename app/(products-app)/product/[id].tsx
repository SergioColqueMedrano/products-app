import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { ThemedTextInput } from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery } = useProduct(`${id}`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: productQuery.data?.title,
    });
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={product.images} />
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

        <ThemedView
          style={{
            marginHorizontal: 10,
          }}
        >
          <ThemedButtonGroup
            options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
            selectedOptions={product.sizes}
            onSelect={(option) => console.log({ option })}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
