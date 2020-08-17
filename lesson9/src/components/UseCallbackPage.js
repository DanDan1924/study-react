import * as React from "react";
import { useState, useCallback, PureComponent,Component } from "react";
export default function UseCallbackPage(props) {
    const [count, setCount] = useState(0);
    // 接受两个参数：1：回调函数 2：依赖项数组（只有依赖项）
    // (当把回调函数传递给经过优化的应使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用)
    const addClick = useCallback(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
    },[count])
    const [value, setValue] = useState("");
    return (
        <div>
            <h3>UseCallbackPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={event => setValue(event.target.value)} />
            <Child addClick={addClick} />
        </div>
    );
}
class Child extends PureComponent {
    // PureComponent里面有shouldComponentUpdate
    render() {
        console.log()
        console.log("child render");
        const { addClick } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        );
    }
}
