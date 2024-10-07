import { ProductService } from "api/services/product.service";
import { modalVisibleState } from "components/csmodal";
import {
  SetterOrUpdater,
  useRecoilRefresher_UNSTABLE,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { keywordState, productsState, selectedProductState } from "state";
import { Product } from "types/product";

export const useProducts = () => {
  const setKeyword = useSetRecoilState(keywordState);
  const refreshProducts = useRecoilRefresher_UNSTABLE(productsState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const clearSelectedProduct = useResetRecoilState(selectedProductState);

  const deleteProduct = (id) => {
    ProductService.delete(id)
      .then(() => {
        refreshProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = async (newProduct: Product, modalVisible?: boolean) => {
    await ProductService.create(newProduct)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
          clearSelectedProduct();
          setTimeout(() => {
            refreshProducts();
          }, 320);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProduct = (updateProduct: Product, modalVisible?: boolean) => {
    ProductService.update(updateProduct)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
          clearSelectedProduct();
          setTimeout(() => {
            refreshProducts();
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchProductByKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return { deleteProduct, addProduct, updateProduct, searchProductByKeyword };
};

export default useProducts;
