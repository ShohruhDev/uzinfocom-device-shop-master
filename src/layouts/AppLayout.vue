<template>
  <el-page-header>
    <template #content>
      <div>
        <h2 class="header_title">DeviceShopMaster</h2>
      </div>
    </template>
    <template #extra>
      <div>
        <el-button plain @click="openModal" type="primary">Создать товар</el-button>
      </div>
    </template>
  </el-page-header>
  <div>
    <router-view />
  </div>
  <GoodsCreateModal v-model="isModalOpen" :mode="'create'" @update:modelValue="getGoodsList()" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GoodsCreateModal from '../components/GoodsCreateModal.vue';
  import { getGoodsList } from '../services/goods';

  const isModalOpen = ref<boolean>(false);
  const openModal = (): void => {
    isModalOpen.value = true;
  };
</script>
<style lang="scss">
  .header_title {
    color: #409eff;
  }
</style>
