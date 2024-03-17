<template>
  <div class="filter">
    <el-input
      placeholder="Поиск по модели"
      v-model="filterModel"
      clearable
      @clear="handleFilterChange"
      style="margin-bottom: 20px"
    />
    <el-select
      v-model="filterCategory"
      placeholder="Выберите категорию"
      @change="handleFilterChange"
      clearable
      style="margin-bottom: 20px; margin-left: 20px"
    >
      <el-option v-for="category in categories" :key="category.value" :label="category.label" :value="category.value" />
    </el-select>
  </div>
  <div class="table">
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column prop="model" label="Модель" width="180" />
      <el-table-column prop="release_date" label="Дата релиза" width="180" />
      <el-table-column prop="category" label="Категория" />
      <el-table-column prop="retail_price" label="Рекомендуемая розничная цена" />
      <el-table-column prop="created_date" label="Дата создания" />
      <el-table-column prop="is_visible" label="Видимость товара">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_visible" @change="updateGoodVisibility(row.id, row)"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash-es';
  import { getGoodsList, updateGood } from '../services/goods';

  const goodsData = ref([]);
  const currentPage = ref(1);
  const totalItems = ref(0);
  const filterModel = ref('');
  const filterCategory = ref('');
  const categories = ref([
    { value: 'iphone', label: 'iphone' },
    { value: 'samsung', label: 'samsung' },
  ]);

  const fetchGoods = () => {
    getGoodsList(currentPage.value, filterModel.value, filterCategory.value).then(res => {
      goodsData.value = res.data.data;
      totalItems.value = res.data.items;
    });
  };

  const handlePageChange = newPage => {
    currentPage.value = newPage;
    fetchGoods();
  };
  const handleFilterChange = () => {
    currentPage.value = 1; // Reset to first page on filter change
    debouncedGetGoods();
  };

  const debouncedGetGoods = debounce(fetchGoods, 500);

  watch([filterModel, filterCategory], () => {
    currentPage.value = 1;
    debouncedGetGoods();
  });

  const updateGoodVisibility = (id, payload) => {
    updateGood(id, payload);
  };

  fetchGoods();
</script>
<style lang="scss">
  .filter {
    display: flex;
    margin-bottom: 20px;
  }
  .table {
    margin: 20px;
    &_pagination {
      display: flex;
      margin-top: 20px;
      justify-content: end;
    }
  }
</style>
