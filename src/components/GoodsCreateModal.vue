<template>
  <el-dialog
    @close="emit('update:model-value', false)"
    :model-value="modelValue"
    width="500px"
    title="Создать товар"
    align-center
  >
    <el-form :model="formData" labelPosition="top">
      <el-form-item label="Модель">
        <el-input v-model="formData.model" />
      </el-form-item>
      <el-form-item label="Дата релиза">
        <el-date-picker v-model="formData.realizeDate" />
      </el-form-item>
      <el-form-item label="Категория">
        <el-select v-model="formData.category" placeholder="Please select a zone">
          <el-option
            v-for="option in categoryOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Розничная цена">
        <el-input v-model="formData.retailPrice" />
      </el-form-item>
      <el-form-item label="Описание товара">
        <el-input type="textarea" v-model="formData.description" />
      </el-form-item>
      <div class="form-item">
        <el-form-item label="Видимость товара">
          <el-checkbox v-model="formData.isVisible" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="">
        <el-button @click="emit('update:model-value', false)">Отмена</el-button>
        <el-button type="primary" @click="create()"> {{ isEditMode ? 'Изменить' : 'Создать' }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive, watch, ref } from 'vue';
  import { createGood, updateGood } from '../services/goods';
  import { formatDate } from 'date-fns';
  const emit = defineEmits(['update:model-value']);

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    editData: {
      type: Object,
    },
    mode: {
      type: String,
      required: true,
    },
  });
  let formData = reactive({
    model: null,
    realizeDate: null,
    category: null,
    retailPrice: null,
    description: null,
    isVisible: false,
  });
  const categoryOptions = [
    {
      label: 'samsung',
      value: 'samsung',
    },
    {
      label: 'iphone',
      value: 'iphone',
    },
    {
      label: 'pixel',
      value: 'pixel',
    },
  ];
  const create = () => {
    if (props.mode === 'edit') {
      updateGood(formData?.id, formData).then(() => {
        emit('update:model-value', false);
        ElMessage({
          showClose: true,
          message: 'Товар успешно обновлен',
          type: 'success',
        });
      });
    } else {
      const { model, realizeDate, category, retailPrice, description, isVisible, fileList } = formData;
      const params = {
        model: model,
        category: category,
        retail_price: retailPrice,
        release_date: formatDate(realizeDate, 'yyyy-MM-dd'),
        description: description,
        created_date: formatDate(new Date(), 'yyyy-MM-dd'),
        is_visible: isVisible,
        file_list: fileList,
      };
      createGood(params).then(() => {
        emit('update:model-value', false);
        ElMessage({
          showClose: true,
          message: 'Товар успешно создан',
          type: 'success',
        });
      });
    }
  };
  const isEditMode = ref(false);
  watch(
    () => props.editData,
    () => {
      if (props.mode === 'edit') {
        formData = props.editData;
        isEditMode.value = true;
      }
    }
  );
</script>

<style lang="scss" scoped>
  .form-item {
    display: flex;
    justify-content: center;
  }
</style>
