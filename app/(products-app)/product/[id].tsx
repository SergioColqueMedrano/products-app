import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import MenuIconButton from "@/presentation/theme/components/MenuIconButton";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { ThemedTextInput } from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

const ProductScreen = () => {
  const { selectedImages, clearImages } = useCameraStore();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(`${id}`);

  useEffect(() => {
    return () => {
      clearImages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push("/camera")}
          icon="camera-outline"
        />
      ),
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
    <Formik
      initialValues={product}
      onSubmit={(productLike) =>
        productMutation.mutate({
          ...productLike,
          images: [...productLike.images, ...selectedImages],
        })
      }
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={productQuery.isRefetching}
                onRefresh={async () => {
                  await productQuery.refetch();
                }}
              />
            }
          >
            <ProductImages images={[...product.images, ...selectedImages]} />
            <ThemedView style={{ marginHorizontal: 10, marginTop: 10 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={4}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
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
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("inStock")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
              }}
            >
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize as Size
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];
                  setFieldValue("sizes", newSizesValue);
                }}
              />
              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(selectOption) =>
                  setFieldValue("gender", selectOption)
                }
              />
            </ThemedView>

            {/* Boton para guardar*/}

            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              <ThemedButton
                icon="save-outline"
                onPress={() => handleSubmit()}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;
