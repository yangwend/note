## flutter

### 注意

1. 所有变量引用的都是 **对象**，每个对象都是一个 **类** 的实例。数字、函数以及 null 都是对象。除去 null 以外（如果你开启了 **空安全**）, 所有的类都继承于 `**Object**` 类。如果一个对象的引用**不局限于单一的类型**，可以将其指定为 Object（或 dynamic）类型。

   ```dart
   // 通过 var 声明局部变量 name
   var name = 'Bob'; // name 变量类型被推断为 String
   String name = 'Bob'; // name 变量类型被指定为 String
   Object name = 'Bob'; // name 变量类型被指定为 Object
   ```

2. 在 Dart 中，未初始化以及可空类型的变量拥有一个默认的初始值 null。（如果你未迁移至 **空安全**，所有变量都为**可空类型**。）即便数字也是如此，因为在 Dart 中 `**一切皆为对象**` ，数字也不例外。如果你开启了**空安全**，在你使用非空变量之前，你必须初始化他们。

   ```dart
   int? lineCount;
   assert(lineCount == null);

   // 开启空安全
   int lineCount = 0;
   ```

3. 如果你确保一个变量在使用前已经赋值了，但是 Dart 类型检测不认可，你可以通过声明这个变量为 `late` 来修复这个错误。

```dart
 late String description;

 void main() {
   description = 'set value';
   print(description);
 }
```

如果你给 `late` 类型的变量赋值失败了，代码在 JIT 编译阶段，会报错。失败的原因有两个：
① 这个变量不需要存在，且不容易初始化；
② 你正在给一个依赖 `this.` 初始化的实例变量进行初始化；

```dart
// 如果 temperature 没有使用到，那后面这个表达式永远都不会被调用
late String temperature = _readThermometer(); // Lazily initialized.
```

4. 如果你不想更改一个变量，可以使用关键字 final 或者 const 修饰变量，这两个关键字可以替代 var 关键字或者加在一个具体的类型前。**一个 final 变量只可以被赋值一次**；**一个 const 变量是一个编译时常量（const 变量同时也是 final 的）**。顶层的 final 变量或者类的 final 变量在其第一次使用的时候被初始化。

   ```dart
   final name = 'Bob';
   final String nickname = 'Bobby';
   name = 'Alice'; // × Error: a final variable can only be set once.
   ```

   没有使用 final 或 const 修饰的变量的值是可以被更改的，即使这些变量之前引用过 const 的值。常量的值不可以被修改：

   ```dart
   var foo = const[];
   final bar = const[];
   const Object i = 3;
   const baz = []; // Equivalent to `const []`
   baz = [42]; // × Error: Constant variables can't be assigned a value.
   ```

5. Dart 语言支持下列内容：

   - Numbers (int, double)
   - Strings (String)
   - Booleans (bool)
   - Lists (也被称为 arrays)
   - Sets (Set)
   - Maps (Map)
   - Runes (常用于在 Characters API 中进行字符替换)
   - Symbols (Symbol)
   - The value null (Null)

6. 你可以声明一个变量为 `num` 类型，这个变量可能存在 `int` 或者 `double` 两种类型值。

   ```dart
   num x = 1; // x can have both int and double values
   x += 3.6;
   ```

7. 字符串和数字之间的转换：
   （1）String -> int：

   ```dart
   var one = int.parse('1');
   assert(one == 1);
   ```

   （2）String -> double：

   ```dart
   var onePointOne = double.parse('1.1');
   assert(onePointOne == 1.1);
   ```

   （3）int -> String：

   ```dart
   String oneAsString = 1.toString();
   assert(oneAsString == '1');
   ```

   （4）double -> String：

   ```dart
   String piAsString = 3.14159.toStringAsFixed(2);
   assert(piAsString == '3.14');
   ```

8. 在字符串中，请以 `${表达式}` 的形式使用表达式，如果表达式是一个标识符，可以省略掉 `{}`。如果表达式的结果为一个对象，则 Dart 会调用该对象的 `toString` 方法来获取一个字符串。

9. 可以使用 + 运算符或并列放置多个字符串来连接字符串。

   ```dart
   var s1 = 'String '
   'concatenation'
   " works even over line breaks.";
   assert(s1 ==
      'String concatenation works even over '
          'line breaks.');

   var s2 = 'The + operator ' + 'works, as well.';
   assert(s2 == 'The + operator works, as well.');
   ```

10. 可以使用三个单引号或者三个双引号创建多行字符串。

    ```dart
    var s1 = '''
    You can create
    multi-line strings like this one.
    ''';

    var s2 = """This is also a
    multi-line string.""";
    ```

11. 在字符串前加上 r 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）：

    ```dart
    // 此处的 \n 会直接输出而不是作为转义换行
    var s = r'In a raw string, not even \n gets special treatment.';
    ```

12. 字符串字面量是一个编译时常量，只要是编译时常量 (null、数字、字符串、布尔) 都可以作为字符串字面量的插值表达式。

    ```dart
    // These work in a const string.
    const aConstNum = 0;
    const aConstBool = true;
    const aConstString = 'a constant string';

    // These do NOT work in a const string.
    var aNum = 0;
    var aBool = true;
    var aString = 'a string';
    const aConstList = [1, 2, 3];

    const validConstString = '$aConstNum $aConstBool $aConstString';
    // const invalidConstString = '$aNum $aBool $aString $aConstList';
    ```

13. 扩展操作符（...）。空感知扩展操作符（...?）：如果扩展操作符右边可能为 null，使用它来避免产生异常。

    ```dart
    var list = [1, 2, 3];
    var list2 = [0, ...list];
    assert(list2.length == 4);

    var list;
    var ltist2 = [0, ...?list];
    assert(list2.length == 1);
    ```

14. set 是一组特定元素的无序集合，可以由集合的字面量和 Set 类提供。可以使用在 {} 前加上类型参数的方式创建一个空的 Set，或者将 {} 赋值给一个 Set 类型的变量。

    ```dart
    var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
    var names = <String>{};
    // Set<String> names = {}; // This works, too.
    // var names = {}; // Creates a map, not a set.
    ```

    使用 add() 方法或 addAll() 方法向已存在的 Set 中添加项目，使用 .length 可以获取 Set 中元素的数量，

    ```dart
    var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
    var elements = <String>{};
    elements.add('ewewewe');
    elements.addAll(halogens);
    assert(elements.length == 5);
    ```

    可以在 Set 变量前添加 const 关键字创建一个 Set 编译时常量。

    ```dart
    final constantSet = const {
      'fluorine',
      'chlorine',
      'bromine',
      'iodine',
      'astatine',
    };
    // constantSet.add('helium'); // This line will cause an error.
    ```

15. Map 字面量语法相似于 Set 字面量语法。因为先有的 Map 字面量语法，所以 {} 默认是 Map 类型。如果忘记在 {} 上注释类型或赋值到一个未声明类型的变量上，那么 Dart 会创建一个类型为 `Map<dynamic, dynamic>` 的对象。

16. Map 是用来关联 keys 和 values 的对象。其中键和值都可以是任何类型的对象。每个 _键_ 只能出现一次但是 _值_ 可以重复出现多次。 Dart 中 Map 提供了 Map 字面量以及 Map 类型两种形式的 Map。

    ```dart
    var gifts = {
      // Key:    Value
      'first': 'partridge',
      'second': 'turtledoves',
      'fifth': 'golden rings'
    };

    var nobleGases = {
      2: 'helium',
      10: 'neon',
      18: 'argon',
    };

    var gifts = Map<String, String>();
    gifts['first'] = 'partridge';
    gifts['second'] = 'turtledoves';
    gifts['fifth'] = 'golden rings';

    var nobleGases = Map<int, String>();
    nobleGases[2] = 'helium';
    nobleGases[10] = 'neon';
    nobleGases[18] = 'argon';
    ```

    如果检索的 Key 不存在于 Map 中则会返回一个 null。使用 .length 可以获取 Map 中键值对的数量。

    ```dart
    var gifts = {'first': 'partridge'};
    assert(gifts['fifth'] == null);
    assert(gifts.length == 1);
    ```

    在一个 Map 字面量前添加 const 关键字可以创建一个 Map 编译时常量。

    ```dart
    final constantMap = const {
      2: 'helium',
      10: 'neon',
      18: 'argon',
    };

    // constantMap[2] = 'Helium'; // This line will cause an error.
    ```

17. 定义函数时，使用 `{参数1, 参数2, …}` 来指定命名参数，调用函数时，可以使用 `参数名: 参数值` 的形式来指定命名参数。命名参数默认为可选参数，除非他们被特别标记为 `required`。

    ```dart
    /// Sets the [bold] and [hidden] flags ...
    void enableFlags({bool? bold, bool? hidden}) {...}
    enableFlags(bold: true, hidden: false);
    ```

18. 使用 `[]` 将一系列参数包裹起来作为可选参数中的位置参数。使用 `=` 为函数的命名参数和未知参数定义默认值，没有指定默认值的情况下默认值为 `null`。

    ```dart
    String say(String from, String msg, [String? device]) {
      var result = '$from says $msg';
      if (device != null) {
        result = '$result with a $device';
      }
      return result;
    }
    String say(String from, String msg, [String device = 'carrier pigeon']) {
      var result = '$from says $msg with a $device';
      return result;
    }
    ```

19. 匿名函数、 Lambda 表达式 或 Closure 闭包：没有名字的方法。形如：
    ([[类型] 参数[, …]]) {
    函数体;
    };

    ```dart
    const list = ['apples', 'bananas', 'oranges'];
    list.forEach((item) {
      print('${list.indexOf(item)}: $item');
    })
    ```

20. 可以使用 `=` 来赋值，同时也可以使用 `??=` 来为值为 `null` 的变量赋值。
    ```dart
    // Assign value to a
    a = value;
    // Assign value to b if b is null; otherwise, b stays the same
    // 如果 b 是 null，则把 value 赋值给 b，否则不处理
    b ??= value;
    ```
21. 条件表达式：表达式 1 ?? 表达式 2
    如果表达式 1 为非 null 则返回其值，否则执行表达式 2 并返回其值。

22. 级联运算符 (`..`, `?..`) 可以让你在同一个对象上连续调用多个对象的变量或方法。

    ```dart
    var paint = Paint()
        ..color = Colors.black
        ..strokeCap = StrokeCap.round
        ..strokeWidth = 5.0;

    <==>

    var paint = Paint();
    paint.color = Colors.black;
    paint.strokeCap = StrokeCap.round;
    paint.strokeWidth = 5.0;
    ```

    ```dart
    querySelector('#confirm') // Get an object.
      ?..text = 'Confirm' // Use its members.
      ..classes.add('important')
      ..onClick.listen((e) => window.alert('Confirmed!'))
      ..scrollIntoView();

    <==>

    var button = querySelector('#confirm');
    button?.text = 'Confirm';
    button?.classes.add('important');
    button?.onClick.listen((e) => window.alert('Confirmed!'));
    button?.scrollIntoView();
    ```

23. 使用 For 循环进行迭代。Dart 语言中，for 循环中的闭包会自动捕获循环的 索引值 以避免 JavaScript 中一些常见的陷阱。
    （1）for (var i = 0; i < 5; i++) {}
    （2）for (final candidate in candidates) {}
    （3）forEach

24. while 循环会在执行循环体前先判断条件；do-while 循环则会 先执行一遍循环体 再判断条件；使用 break 可以中断循环；使用 continue 可以跳过本次循环直接进入下一次循环；每一个非空的 case 子句都必须有一个 break 语句，也可以通过 continue、throw 或者 return 来结束非空 case 语句。

25. 抛出异常：优秀的代码通常会抛出 Error 或 Exception 类型的异常。
    ```dart
    throw FormatException('Expected at least 1 section');
    throw 'i am exception';
    ```
26. 捕获异常：
    可以使用 on 或 catch 来捕获异常，使用 on 来指定异常类型，使用 catch 来捕获异常对象，两者可同时使用。
    ```dart
      try {
        breedMoreLlamas();
      } on OutOfLlamasException {
        // A specific exception
        buyMoreLlamas();
      } on Exception catch (e) {
        // Anything else that is an exception
        print('Unknown exception: $e');
      } catch (e) {
        // No specified type, handles all
        print('Something really unknown: $e');
      }
    ```

    关键字 rethrow 可以将捕获的异常再次抛出。

    ```dart
    void misbehave() {
      try {
        dynamic foo = true;
        print(foo++); // Runtime error
      } catch (e) {
        print('misbehave() partially handled ${e.runtimeType}.');
        rethrow; // Allow callers to see the exception.
      }
    }

    void main() {
      try {
        misbehave();
      } catch (e) {
        print('main() finished handling ${e.runtimeType}.');
      }
    }
    ```
    无论是否抛出异常，finally 语句始终执行，如果没有指定 catch 语句来捕获异常，则异常会在执行完 finally 语句后抛出。


### 升级 Flutter

Flutter SDK 有多个分支，如 beta、dev、master、stable，其中 stable 分支为稳定分支（日后有新的稳定版本发布后可能也会有新的稳定分支，如 1.0.0），dev 和 master 为开发分支，安装 flutter 后，你可以运行 `flutter channel` 查看所有分支。

带"\*"号的分支即你本地的 Flutter SDK 跟踪的分支，要切换分支，可以使用 flutter channel beta 或 flutter channel master，Flutter 官方建议跟踪稳定分支。

升级 flutter sdk，只需一句命令：

```cmd
flutter upgrade
```

该命令会同时更新 Flutter SDK 和你的 flutter 项目依赖包。如果你只想更新项目依赖包（不包括 Flutter SDK），可以使用如下命令：

1. `flutter packages get` 获取项目所有的依赖包。
2. `flutter packages upgrade` 获取项目所有依赖包的最新版本。

### 参考链接

1. [Flutter 实战 第二版](https://book.flutterchina.club/)

2. [flutter 中文网](https://flutterchina.club/get-started/install/)

3. [Dart 中文网](https://dart.cn/overview)
