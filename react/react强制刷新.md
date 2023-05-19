## react 强制刷新

window.location.reload(); // 强制页面刷新

this.forceUpdate();

this.setState({});

```tsx
const [refresh, setRefresh] = useState(false);

useEffect(() => {
  refresh && setTimeout(() => setRefresh(false));
}, [refresh]);

const doRefresh = () => setRefresh(true);
```
