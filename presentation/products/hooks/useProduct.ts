import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) => {
      // TODO: dispirar la accion de guardar
      console.log({ data });
      return data;
    },

    onSuccess: (data: Product) => {
      // TODO: Invalidar productos queries
      Alert.alert(
        "Producto guardado",
        `${data.title} ha sido guardado correctamente.`
      );
    },
  });
  // Mantener el ID del producto en case de ser uno nuevo

  return { productQuery, productMutation };
};
