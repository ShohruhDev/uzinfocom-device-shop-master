<template>
  <el-dialog :model-value="modelValue" width="500px" title="Shipping address" align-center>
    <Form ref="form" :validation-schema="schema">
      <el-form :model="formData" labelPosition="top">
        <el-form-item label="Модель">
          <Field name="model" v-model="formData.model">
            <el-input v-model="formData.model" />
            <ErrorMessage name="model" />
          </Field>
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
        <el-form-item label="Видимость товара">
          <el-checkbox v-model="formData.isVisible" />
        </el-form-item>
      </el-form>
    </Form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="validate().then(valid => valid.valid && create())"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { createGood } from '../services/goods';
  import { formatDate } from 'date-fns';
  import { Form, Field, ErrorMessage } from 'vee-validate';

  defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  });
  const formData = reactive({
    model: null,
    realizeDate: null,
    category: null,
    retailPrice: null,
    description: null,
    isVisible: null,
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
    const { model, realizeDate, category, retailPrice, description, isVisible } = formData;
    const params = {
      model: model,
      category: category,
      retail_price: retailPrice,
      release_date: formatDate(realizeDate, 'yyyy-MM-dd'),
      description: description,
      created_date: formatDate(new Date(), 'yyyy-MM-dd'),
      is_visible: isVisible,
    };
    createGood(params);
  };
</script>

<style lang="scss" scoped></style>
