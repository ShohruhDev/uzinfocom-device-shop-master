<template>
  <el-dialog
    @close="emit('update:model-value', false)"
    :model-value="modelValue"
    width="500px"
    title="Создать товар"
    align-center
  >
    <el-form labelPosition="top">
      <el-form-item label="Модель" :error="errors.model">
        <el-input v-model="model" />
      </el-form-item>
      <div class="form-item">
        <el-form-item label="Дата релиза" :error="errors.releaseDate">
          <el-date-picker v-model="releaseDate" />
        </el-form-item>
        <el-form-item
          class="form-item__checkbox"
          labelPosition="left"
          v-if="mode === 'create'"
          label="Видимость товара"
        >
          <el-checkbox v-model="isVisible">Сделать активным</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item label="Категория" :error="errors.category">
        <el-select v-model="category" placeholder="Выберите категорию">
          <el-option
            v-for="option in categoryOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Розничная цена" :error="errors.retailPrice">
        <el-input v-model="retailPrice" />
      </el-form-item>
      <el-form-item label="Описание товара" :error="errors.description">
        <el-input type="textarea" v-model="description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="">
        <el-button @click="emit('update:model-value', false)">Отмена</el-button>
        <el-button v-if="mode === 'create'" create type="primary" @click="onSubmit">Создать </el-button>
        <el-button v-else type="primary" @click="update"> Изменить </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue';
  import { createGood, updateGood } from '../services/goods';
  import { formatDate } from 'date-fns';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { GoodEntity } from '../types/types';
  import { ElMessage } from 'element-plus';

  type EmitTypes = {
  (event: 'update:model-value', value: boolean): void;
};

const emit: EmitTypes = defineEmits<EmitTypes>();

  interface Props {
    modelValue: boolean;
    editData?: { [key: string]: any } | null;
    mode: string;
  }

  const props = defineProps<Props>();

  const categoryOptions = [
    {
      label: 'samsung',
      value: 'samsung',
    },
    {
      label: 'iphone',
      value: 'iphone',
    },
  ];

  const { errors, handleSubmit } = useForm({
    validationSchema: yup.object({
      model: yup.string().required(),
      realizeDate: yup.date().required(),
      category: yup.string().required(),
      retailPrice: yup.string().required(),
      description: yup.string().required(),
      isVisible: yup.boolean(),
    }),
  });

  const onSubmit = handleSubmit(values => {
    const { model, realizeDate, category, retailPrice, description, isVisible } = values;
    const params = {
      model: model,
      category: category,
      retail_price: retailPrice,
      release_date: formatDate(realizeDate, 'yyyy-MM-dd'),
      description: description,
      created_date: formatDate(new Date(), 'yyyy-MM-dd'),
      is_visible: isVisible,
    };
    createGood(params).then(() => {
      emit('update:model-value', false);
      ElMessage({
        showClose: true,
        message: 'Товар успешно создан',
        type: 'success',
      });
    });
  });

  const update = handleSubmit(values => {
    const { model, realizeDate, category, retailPrice, description, isVisible } = values;

    const payload: GoodEntity = {
      model: model,
      category: category,
      retail_price: retailPrice,
      release_date: formatDate(realizeDate, 'yyyy-MM-dd'),
      description: description,
      created_date: formatDate(new Date(), 'yyyy-MM-dd'),
      is_visible: isVisible,
      id: goodId.value
    };

    updateGood(goodId.value, payload).then(() => {
      emit('update:model-value', false);
      ElMessage({
        showClose: true,
        message: 'Товар успешно обновлен',
        type: 'success',
      });
    });
  });
  const { value: model, setValue: setModel } = useField<string>('model');
  const { value: releaseDate, setValue: setReleaseDate } = useField<string>('realizeDate');
  const { value: category, setValue: setCategory } = useField<string>('category');
  const { value: retailPrice, setValue: setRetailPrice } = useField<string>('retailPrice');
  const { value: description, setValue: setDescription } = useField<string>('description');
  const { value: isVisible, setValue: setIsVisible } = useField<boolean>('isVisible');
  const goodId = ref<string | number>('');
  watch(
    () => props.editData,
    newVal => {
      if (props.mode === 'edit' && newVal) {
        setModel(newVal.model || '');
        setReleaseDate(newVal.release_date || '');
        setCategory(newVal.category || '');
        setRetailPrice(newVal.retail_price || '');
        setDescription(newVal.description || '');
        setIsVisible(newVal.isVisible || false);
        goodId.value = newVal.id;
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .form-item {
    display: flex;
    &__checkbox {
      margin-left: 40px;
    }
  }
</style>
