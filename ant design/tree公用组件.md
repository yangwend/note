## Tree 公用组件

在业务上，经常会碰到使用 `Tree` 组件 和 `TreeSelect` 组件的需求。但是呢，可能不同的业务中交互会有一点差异，此时不同业务中都去实现一个 `Tree` 组件 和 `TreeSelect` 组件就很没必要了。因此，我们可以把不同业务场景中 `Tree` 组件 和 `TreeSelect` 组件的共性交互抽成一个公用组件，然后由公共组件来处理差异性，这样既可以减少重复造轮子，又可以支撑不同业务的发展。

### Tree 组件，如何针对搜索值对数据源进行过滤？

```ts
import { IProOrgTreeNode, IProCheckedAreaItem, IOptions, IOriginTreeNode } from '@/types';

export default class SSOUtils {
  /**
   * @description 过滤组织机构底层没有 primaryKey 的组织机构
   * @author yangwen
   * @static
   * @param {IProOrgTreeNode[]} list
   * @param {string} primaryKey
   * @memberof SSOUtils
   */
  static excludeNode = (list: IProOrgTreeNode[], primaryKey: string) => {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      if (!node.children || node.children.length === 0) {
        if (node.hierarchy !== primaryKey) {
          list.splice(i, 1);
          i--;
        }
      } else {
        SSOUtils.excludeNode(node.children, primaryKey);
        if (node.children.length === 0 && node.hierarchy !== primaryKey) {
          list.splice(i, 1);
          i--;
        }
      }
    }
  };

  /**
   * @description 由父级到子级，获取父节点集合
   * @author yangwen
   * @static
   * @param {string} key
   * @param {IProOrgTreeNode[]} tree
   * @memberof SSOUtils
   */
  static getParentKey = (key: string, tree: IProOrgTreeNode[]): string | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: IProOrgTreeNode) => item.key === key)) {
          parentKey = node.key;
        } else if (SSOUtils.getParentKey(key, node.children)) {
          parentKey = SSOUtils.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  /**
   * @description 如果子节点都选中，则取父节点返回
   * @author yangwen
   * @static
   * @param {IProOrgTreeNode[]} originNodes 选中的节点包含父节点和父节点下的子节点
   * @memberof SSOUtils
   */
  static filterParentNodes = (originNodes: IProOrgTreeNode[]) => {
    const newNodes: IProOrgTreeNode[] = [];
    const oldNodes = [...originNodes];
    // 按照 hierarchy 由小到大排序
    oldNodes.sort((a: IProOrgTreeNode, b: IProOrgTreeNode) => {
      return parseInt(a.hierarchy) - parseInt(b.hierarchy);
    });
    oldNodes.map((item: IProOrgTreeNode) => {
      if (
        !newNodes.find((newItem) => {
          return (
            newItem.key === item.key ||
            item.trace
              ?.split('/')
              ?.filter((a) => !!a)
              .includes(newItem.key || '')
          );
        })
      ) {
        newNodes.push(item);
      }
    });
    console.log('newNodes->', newNodes);
    return newNodes;
  };

  /**
   * @description 根据 keys 获取对应的 nodes
   * @author yangwen
   * @static
   * @param {string[]} keys
   * @param {{ [key: string]: any }} dataListMap
   * @memberof SSOUtils
   */
  static getNodesByKeys = (keys: string[], dataListMap: { [key: string]: any }) => {
    const newData: IProOrgTreeNode[] = [];
    // 防止顺序变化
    keys.map((key) => {
      const curr = dataListMap[key];
      if (curr) {
        newData.push(curr);
      }
    });
    return newData;
  };

  /**
   * @description 根据 searchValue 过滤包含 filterFunc 为 true 的节点
   * @author yangwen
   * @static
   * @param {IProOrgTreeNode[]} treeData
   * @param {string} searchValue
   * @param {{
   *       filterFunc?: (node: IProOrgTreeNode) => boolean;
   *     }} {
   *       filterFunc,
   *     }
   * @memberof SSOUtils
   */
  static filterTreeBySearchValue = (
    treeData: IProOrgTreeNode[],
    searchValue: string,
    {
      filterFunc,
    }: {
      filterFunc?: (node: IProOrgTreeNode) => boolean;
    }
  ) => {
    // 没有搜索值，直接返回原数据
    if (!searchValue) {
      return treeData;
    }

    let finalFilterFunc: (node: IProOrgTreeNode) => boolean;
    if (typeof filterFunc === 'function') {
      finalFilterFunc = filterFunc;
    } else {
      // 提供一个默认的过滤条件
      finalFilterFunc = (node: IProOrgTreeNode) => {
        if (!searchValue) {
          return true;
        }
        return node.name?.toUpperCase().includes(searchValue.toUpperCase()) ?? false;
      };
    }

    function dig(list: IProOrgTreeNode[], keepAll = false) {
      const nodeData: IProOrgTreeNode[] = [];
      for (let i = 0; i < list.length; i++) {
        const node = list[i];
        const children = node.children || [];

        // keepAll 为 true，即父节点已经匹配，其下所有子节点都保留；否则子节点匹配后保留
        const match = keepAll || finalFilterFunc(node);
        const childList = dig(children, match);

        if (match || childList.length > 0) {
          nodeData.push({
            ...node,
            children: childList,
          });
        }
      }
      return nodeData;
    }

    return dig(treeData);
  };

  /**
   * @description 获取树节点的所有的 key 值，最底层节点除外
   * @author yangwen
   * @static
   * @param {IProOrgTreeNode[]} treeData
   * @memberof SSOUtils
   */
  static getAllKeys = (treeData: IProOrgTreeNode[]) => {
    const keys: string[] = [];

    function dig(list: IProOrgTreeNode[]) {
      list.forEach((item) => {
        keys.push(item.key);

        const children = item.children || [];
        if (children.length > 0) {
          dig(children);
        }
      });
    }
    dig(treeData);

    return keys;
  };
}
```

```tsx
// 根据 searchValue 过滤 treeData
const genTreeData = (list: IProOrgTreeNode[], val: string) => SSOUtils.filterTreeBySearchValue(list, val, {});

const onSearch = (value: string) => {
  setSearchValue(value);
  setAutoExpandParent(true);
  if (!!value) {
    const expandedKeys = SSOUtils.getAllKeys(genTreeData(treeData, value));
    setExpandedKeys(expandedKeys);
  }
};

const loop = (data: IProOrgTreeNode[]): IProOrgTreeNode[] =>
  data.map((item: IProOrgTreeNode) => {
    const index = (item.title as string).indexOf(searchValue);
    const beforeStr = (item.title as string).substr(0, index);
    const afterStr = (item.title as string).substr(index + searchValue.length);

    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className='activeText'>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      );

    if (item.children) {
      return {
        ...omit(item, ['title', 'children']),
        title,
        children: loop(item.children),
      };
    }
    return {
      ...omit(item, ['title', 'children']),
      title,
    };
  });

<Tree
  ref={treeRef}
  disabled={disabled}
  blockNode
  checkable
  selectable={false}
  autoExpandParent={autoExpandParent}
  checkedKeys={checkedKeys}
  expandedKeys={expandedKeys}
  onExpand={onExpand}
  height={400}
  treeData={loop(genTreeData(treeData, searchValue))}
/>;
```

可以参考下这个链接：[手把手教你实现 Tree 组件搜索过滤功能，干货满满！](https://zhuanlan.zhihu.com/p/541994203)

### xxx
