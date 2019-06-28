// 权限指令
import { check } from "../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      // 如果没有权限。则移除dom节点
      // 弊端：一次性的，二次修改权限。无法再显示dom
      if (!check(binding.value)) {
        console.log(options);
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
