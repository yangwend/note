## ts 如何从 interface 中提取键并创建类型联合

在 `TypeScript` 中，我们可以使用 `keyof` 关键字从 `interface` 中提取键，并使用 `[]` 运算符来获取该键对应的类型。然后，我们可以使用 `|` 运算符来创建类型联合。以下是一个示例代码：

```ts
interface Person {
  name: string;
  age: number;
  gender: 'male' | 'female';
}

type PersonKey = keyof Person; // 'name' | 'age' | 'gender'
type PersonValueType = Person[PersonKey]; // string | number | 'male' | 'female'
```

在上面的代码中，我们定义了一个 `Person` 接口，并使用 `keyof` 关键字从中提取了键。这里的 `PersonKey` 类型就是一个键的类型联合，它的值为`'name' | 'age' | 'gender'`。接着，我们使用 `[]` 运算符获取了 `Person` 中每个键对应的类型，这里的 `PersonValueType` 类型就是一个值的类型联合，它的值为 `string | number | 'male' | 'female'`。

这个方法可以用于动态创建类型，尤其在需要根据接口属性动态生成代码时非常有用。
