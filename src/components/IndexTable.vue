<template>
  <div>
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column prop="model" label="Модель" width="180" />
      <el-table-column prop="release_date" label="Дата релиза" width="180" />
      <el-table-column prop="category" label="Категория" />
      <el-table-column prop="retail_price" label="Рекомендуемая розничная цена" />
      <el-table-column prop="created_date" label="Дата создания" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { getGoodsList } from '../services/goods';
  import { ref } from 'vue';

  const goodsData = ref([]);
  const getGoods = () => {
    getGoodsList().then(res => {
      goodsData.value = res.data;
      console.log(goodsData.value);
    });
  };
  getGoods();
</script>

<style lang="scss" scoped></style>
