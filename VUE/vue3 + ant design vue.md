## vue3 + ant design vue

技术栈：vue3 + vite + ts + ant design vue + pinia

### `a-select` 组件实现下拉分页

在开发过程中，遇到一个交互，在编辑弹窗中，展示一个下拉列表，下拉列表会存在很多数据，需要做分页处理。但是 `a-select` 组件并未提供支持下拉分页加载更多的功能，但是提供了一个 `popupScroll` API 作为下拉列表滚动时的回调。因此可以根据这个 API 做下拉分页处理，代码如下：

```vue
<template>
  <a-form-item label="会员日规则" name="businessId">
    <a-select
      v-model:value="businessId"
      show-search
      style="width: 100%"
      :filter-option="false"
      :not-found-content="pageState.loading ? undefined : null"
      placeholder="请选择会员日规则"
      @search="onSearch"
      @popupScroll="onPopupScroll"
    >
      <a-select-option v-for="item in pageState.list" :key="item.id">
        {{ `${item.activityCode}-${item.descriptions}` }}
      </a-select-option>
      <template v-if="pageState.loading" #notFoundContent>
        <a-spin size="small" />
      </template>
    </a-select>
  </a-form-item>
</template>

<script lang="ts">
interface IPageState {
  keyword: string; // 搜索关键词
  loading: boolean;
  list: IActivityCodeItem[];
  pageNo: number;
  pageSize: number;
  totalPage: number;
}
</script>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { debounce } from 'lodash';
import { memberService } from '@/service/index';

const businessId = ref<string>('xxxxxxxx'); // 编辑时会携带进来
const pageState = reactive<IPageState>({
  keyword: '', // 搜索关键词
  loading: false,
  list: [],
  pageNo: 1,
  pageSize: 20,
  totalPage: 1,
});

const setPageState = (value: Partial<IPageState>) => {
  Object.assign(pageState, value);
}

const onSearch = debounce(async (val: string) => {
  setPageState({ keyword: val, list: [], pageNo: 1, pageSize: 20, totalPage: 1 });
  await fetchActivityCodeList();
}, 500);

const onPopupScroll = async (e) => {
  const { scrollHeight, scrollTop, clientHeight } = e.target;
  if (scrollHeight - scrollTop === clientHeight) {
    console.log('触底了');
    // 触底加载
    if (pageState.pageNo + 1 <= pageState.totalPage) {
      setPageState({ pageNo: pageState.pageNo + 1 });
      await fetchActivityCodeList();
    }
  }
};

const fetchActivityCodeList = async (needLoop = false) => {
  if (pageState.loading) {
    return;
  }

  setPageState({ loading: true });
  try {
    const res = await memberService.getActivityCodeOrName({
      keyword: pageState.keyword,
      pageNo: pageState.pageNo,
      pageSize: pageState.pageSize,
    });
    const { data } = res || {};
    const { result = [], totalPage = 1 } = data || {};
    const finalList = pageState.list.concat(result);
    setPageState({
      totalPage,
      list: finalList,
    });

    if (needLoop) {
      // 当前下拉列表是否存在初始已选中项
      const isExist = finalList.findIndex((item) => item.id === formState.businessId);
      if (isExist === -1 && pageState.pageNo + 1 <= pageState.totalPage) {
        setPageState({ pageNo: pageState.pageNo + 1, loading: false });
        await fetchActivityCodeList(true);
      }
    }
  } catch (error) {
    console.log('error->', error);
  } finally {
    setPageState({ loading: false });
  }
};

onMounted(() => {
  fetchActivityCodeList(true);
});
</script>

<style lang="less" scoped></style>
```

此处注意，如果默认弹窗中选中的选项在下拉列表的接口请求中不会返回，则需要前端自己做处理，将默认项传入`a-select` 组件的数据源中。


### `a-tree` 组件双向绑定传值为 undefined 问题
在开发过程中，使用到 `a-tree` 组件站是一个门店数。

初始化的时候，我传入了一个 [undefined]，门店树选择有问题，这个可能是控件的坑，但是前端在开发过程中也应该避免这种传值出现。

门店树渲染的时候，并不会因为门店编码不存在，就不展示某个门店，因此在选中某些门店后，需要做过滤空处理，防止出现上述情况，导致页面展示有问题。

### 


### 参考链接

1. [基于 Ant Design Vue 的下拉分页](https://www.cnblogs.com/Jessie-candy/p/16442976.html)
