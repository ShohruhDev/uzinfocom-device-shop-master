<template>
  <div class="filter">
    <el-input placeholder="Поиск по модели" v-model="filterModel" clearable @clear="handleFilterChange" />
    <el-select
      v-model="filterCategory"
      placeholder="Выберите категорию"
      @change="handleFilterChange"
      clearable
      style="margin-left: 20px"
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
      <el-table-column>
        <template #default="{ row }">
          <el-button type="primary" @click="openEditModal(row)" :icon="Edit" circle />
          <el-popconfirm
            title="Вы уверены удалить это?"
            width="220"
            confirm-button-text="Да"
            cancel-button-text="Нет"
            :icon="InfoFilled"
            icon-color="#626AEF"
            @confirm="removeGood(row.id)"
          >
            <template #reference>
              <el-button type="danger" :icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="totalItems > 10" class="table_pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
  <GoodsCreateModal v-model="modal.isOpen" :edit-data="modal.data" :mode="'edit'" @success="fetchGoods()" />
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
  import { debounce } from 'lodash-es';
  import { getGoodsList, updateGood, deleteGood } from '../services/goods';
  import { Delete, Edit, InfoFilled } from '@element-plus/icons-vue';
  import GoodsCreateModal from './GoodsCreateModal.vue';
  import { GoodEntity } from '../types/types';
  import { ElMessage } from 'element-plus';
  interface Modal {
    isOpen: boolean;
    data: GoodEntity | null;
  }
  const goodsData = ref<GoodEntity[]>([]);
  const currentPage = ref<number>(1);
  const totalItems = ref<number>(0);
  const filterModel = ref<string>('');
  const filterCategory = ref<string>('');
  const modal: Modal = reactive({
    isOpen: false,
    data: null,
  });
  const categories = [
    { value: 'iphone', label: 'iphone' },
    { value: 'samsung', label: 'samsung' },
  ];

  interface GoodsListResponse {
  data: {
    data: GoodEntity[]; 
    items: number; 
  };
}
  const fetchGoods = () => {
    getGoodsList(currentPage.value, filterModel.value, filterCategory.value).then((res: GoodsListResponse) => {
      goodsData.value = res.data.data;
      totalItems.value = res.data.items;
    });
  };
  const removeGood = (id: string | number) => {
    deleteGood(id).then(() => {
      fetchGoods();
      ElMessage({
        showClose: true,
        message: 'Товар успешно удален',
        type: 'success',
      });
    });
  };
  const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    fetchGoods();
  };
  const handleFilterChange = () => {
    currentPage.value = 1;
    debouncedGetGoods();
  };

  const debouncedGetGoods = debounce(fetchGoods, 500);

  watch([filterModel, filterCategory], () => {
    currentPage.value = 1;
    debouncedGetGoods();
  });

  const updateGoodVisibility = (id: string | number, payload: GoodEntity) => {
    updateGood(id, payload);
  };

  const openEditModal = (val: GoodEntity) => {
    modal.isOpen = true;
    modal.data = val;
  };

  onMounted(() => {
    fetchGoods();
  });
</script>
<style lang="scss">
  .filter {
    display: flex;
    margin-bottom: 40px;
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
