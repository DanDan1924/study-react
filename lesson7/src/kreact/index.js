
import {TEXT} from "./const";

// 创建并返回一个新的react element，根据你给定的type值
function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  
  // 这个地方我们自己写的没有考虑细节，比如key、ref等
  const props = {
    ...(type && type.defaultProps?{...type.defaultProps}:{}),
    ...config,
    children: children.map(child =>
      typeof child === "object" ? child : createTextNode(child)
    )
  };
  return {
    type,
    props
  };
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};
