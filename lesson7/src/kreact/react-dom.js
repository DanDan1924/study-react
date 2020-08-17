/** 
 * 1.什么是虚拟dom
 * 是Js对象，用来描述dom信息和结构，当状态变更时，更新这个Js对象，重新渲染dom
*/
/**
 * 2.action为什么diff虚拟dom对象不是真实dom对象
 * 真实dom的代价比较大，轻微操作都可能导致页面重新排版，非常消耗性能。相对于DOM对象，js对象处理起来更快，更简单。
 * 通过diff算法对比新旧vdom之间的差异，可以批量，最小化的执行dom操作，从而提升性能
*/

// babel-loader将它们转译成了React.createElement(...)形式（babel-loader在webpack里面）
// 


import {isArray} from "util";

import {TEXT} from "./const";

// ! vnode  虚拟dom对象
// ! node  真实dom

function render(vnode, container) {
  // vnode->node
  const node = createNode(vnode);
  // 再把node插入container
  container.appendChild(node);
  console.log("vnode", vnode, container); //sy-log
}

// 创建node
function createNode(vnode) {
  const {type, props} = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  // 把props.children遍历，转成真实dom节点 ，再插入node
  reconcileChildren(props.children, node);
  // 更新属性节点
  updateNode(node, props);
  return node;
}

// 类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  let cmp = new type(props);
  const vvnode = cmp.render();
  // 生成node节点
  const node = createNode(vvnode);
  return node;
}

// 函数组件
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  // 生成node节点
  const node = createNode(vvnode);
  return node;
}

// 更新属性值，如className、nodeValue等
function updateNode(node, nextVal) {
  
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

// ! 源码childrne可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里）
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

export default {render};
