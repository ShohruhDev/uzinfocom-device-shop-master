<template>
  <el-page-header>
    <template #content>
      <div>
        <h2 class="header_title">DeviceShopMaster</h2>
      </div>
    </template>
    <template #extra>
      <div class="header_btn">
        <el-button plain @click="isModalOpen = true" type="primary">Primary</el-button>
      </div>
    </template>
  </el-page-header>
  <div>
    <router-view />
  </div>
  <GoodsCreateModal v-model:model-value="isModalOpen" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GoodsCreateModal from '../components/GoodsCreateModal.vue';
  const isModalOpen = ref(false);
</script>
<style lang="scss">
  .header_title {
    color: #409eff;
  }
  .header_btn {
  }
</style>
