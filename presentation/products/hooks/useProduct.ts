import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";
import { useCameraStore } from "../../store/useCameraStore";

export const useProduct = (productId: string) => {
  const { clearImages } = useCameraStore();
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); // new / UUID

  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),

    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // Actualizar el ID del producto

      clearImages(); // Limpiar las imágenes de la tienda

      queryClient.invalidateQueries({
        queryKey: ["product", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", data.id],
      });

      Alert.alert(
        "Producto guardado",
        `${data.title} ha sido guardado correctamente.`
      );
    },
  });
  // Mantener el ID del producto en case de ser uno nuevo

  return { productQuery, productMutation };
};
