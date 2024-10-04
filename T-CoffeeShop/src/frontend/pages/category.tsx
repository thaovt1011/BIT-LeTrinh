import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, productsByCategoryState, selectedCategoryIdState,} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  // fix
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "Đậu") return -1;
    if (b.name === "Đậu") return 1;
    return 0;
  })
  const navigator = useNavigate();

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryIdState
  );

  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      {sortedCategories?.map((category) => (
        <Tabs.Tab
          key={category.id}
          label={
            <span className="" onClick={() => { setSelectedCategory(category.id); }}>
              {category.name}
            </span>
          }
        >
          <Suspense>
            <CategoryProducts categoryId={category.id} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

// danh mục
const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(productsByCategoryState);

  if (productsByCategory.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    );
  }
  return (
    <Box className="bg-background grid grid-cols-2 gap-5 p-5">
      {productsByCategory.map((product) => (
        <div>
          <ProductItem key={product.id} product={product} />
        </div>
      ))}
    </Box>
  );
};
const CategoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Danh mục" />
      <CategoryPicker />
    </Page>
  );
};

export default CategoryPage;
