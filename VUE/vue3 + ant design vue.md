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
};

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

### form 报错：please transfer a valid name path to form item

最近在做一个交互特别复杂的项目，大概是根据动态的数据源渲染成多组 form 表单，form 表单是一个数组，还有一些其他项构成，其中就存在多层嵌套循环展示。还可以新增和删除。

在绑定 a-form-item 的时候，name 传值错误，导致控制台一直报错：please transfer a valid name path to form item。并且触发的 rules 规则校验也不对。着实困扰了一小段时间。

后面究其原因：a-form-item 的 name 传值后，没有和数据输入框(input)绑定起来，导致表单规则校验一直报错。

解决办法：
根据 a-form-item 包裹的里面的 input 组件绑定的 v-model 的取值字段，从最上层去找路径。

例如：

```vue
<template>
  <a-form>
    <div v-for="(item, index) in state.formData" :key="item.uuid">
      <a-form-item :name="['formData', index, 'eventTime']">
        <a-range-picker
          size="middle"
          allowClear
          v-model:value="item.eventTime"
          valueFormat="YYYY-MM-DD HH:mm:ss"
          show-time
        />
      </a-form-item>
      <table>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <th>列1</th>
          <th>列2</th>
          <th>列3</th>
        </thead>
        <tbody>
          <tr v-for="(tableItem, tableIndex) in item.list" :key="tableItem.uuid">
            <td>
              <a-form-item :name="['formData', index, 'list', tableIndex, 'type']">
                <a-input v-model:value="tableItem.type" />
              </a-form-item>
            </td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </a-form>
</template>
```

如上所示，name 是一个数组，通过数组里面的值可以定位到 v-model:value 绑定的值，才不会报错。**注意注意**

### `a-select` 组件如果小屏幕时选项和选中项鼠标悬浮没有提示文案

1. 直接使用 `a-select` 标签，传值 `options` 和 `field-names`
2. 使用 `a-select` 和 `a-select-option` 标签，则 `a-select-option` 上需要添加 `title` 属性，且此时选中项并不会有提示文案
3. 如果是 `mode="multiple"`，好像不受影响。

反正在开发时多注意下，对于文案比较长的，用方案 1 最好

### 参考链接

1. [基于 Ant Design Vue 的下拉分页](https://www.cnblogs.com/Jessie-candy/p/16442976.html)
