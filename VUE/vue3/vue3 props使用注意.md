## vue3 props 使用注意


### props使用
```vue
// 父组件
<template>
<Table
  :list="list"
  :canceling="canceling"
  // ...
/>
</template>
```
```vue
// 子组件
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    list: IRecordTableListModel;
    canceling: boolean;
  }>(),
  { canceling: false },
);

const currentPage = computed(() => props.list.pageNum);
</script>

<template>
  <div :class="$style.btns">
    <ElButton type="primary" size="medium" :loading="props.canceling">取消</ElButton>
  </div>

  <ElTable border stripe :data="list.data">
    <ElTableColumn v-for="col of TABLE_COLS_FIELD" :key="col.prop" :prop="col.prop" :label="col.label" align="center">
      <template v-slot="scope">
        <div v-if="col.prop === 'city'">{{ scope.row.city }}</div>
      </template>
    </ElTableColumn>
  </ElTable>
  <div :class="$style.tablePagination">
    <ElPagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="list.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.total"
      :hide-on-single-page="false"
    />
  </div>
</template>
```

如上述代码所示，在 script 脚本里面使用 props 时，需要 `props.list`
在 template 里面使用，既可以用 `props.list.total` `props.canceling`，也可以使用 `list.total` `list.pageSize`


### props传值后如何赋值给子组件
```vue
<template>
  <el-dialog
    :model-value="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    append-to-body
    :show-close="!okLoading"
    @open="onOpen"
    @close="onClose"
    width="560px"
  >
    <template #title v-if="visible">
      <div class="el-dialog__title v-app-dialog-title">修改公式</div>
    </template>
    <el-form ref="formRef" hide-required-asterisk :disabled="okLoading" :model="queryModel">
      <el-form-item label="特价" prop="nlms" label-width="48px">
        <el-input placeholder="请输入..." v-model="queryModel.nlms" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div :class="$style.footer">
        <el-button type="primary" @click="onOK" :loading="okLoading">保存</el-button>
        <el-button @click="onClose" :disabled="okLoading">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { withDefaults, ref } from 'vue';
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';
import { useSearchQuery } from '@/hooks';
import { IStrategyStatusType } from '@/types';

const INIT_VALUES = {
  nlms: '',
};

const props = withDefaults(defineProps<{ visible?: boolean; okLoading?: boolean; desc?: string; nlms?: string; status?: IStrategyStatusType }>(), {
  visible: false,
  okLoading: false,
  desc: '',
  nlms: '',
  status: undefined,
});

const emit = defineEmits(['ok', 'close']);

const { queryModel, setQueryModel } = useSearchQuery({ initialValue: INIT_VALUES }) as Omit<ReturnType<typeof useSearchQuery>, 'queryModel'> & {
  queryModel: typeof INIT_VALUES;
};

const formRef = ref<HTMLFormElement | null>(null);

const onOpen = () => {
  setQueryModel({ nlms: props.nlms }); // 将props赋值给当前组件进行使用
};

const onOK = () => {
  emit('ok', { ...queryModel });
};

const onClose = () => {
  emit('close');
};
</script>
```
如上述代码所示，传值给当前组件，当前组件需要默认填入props中的某个字段时，可以在 `onOpen` 方法里面，进行赋值（前提是当前组件需要先设置查询条件） 