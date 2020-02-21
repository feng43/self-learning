class Watcher {
  constructor(vm, exp, cb) {
    // Vue实例
    this.vm = vm;
    // node节点的v-model或v-on：click等指令的属性值。如v-model="name"，exp就是name;
    this.exp = exp;
    // 回调
    this.cb = cb;
    // 将自己添加到订阅器的操作
    this.value = this.get();
  }

  // 更新视图
  update() {
    const value = this.vm.data[this.exp];
    const oldValue = this.value;
    if(value !== oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }

  get() {
    Dep.target = this;
    const value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}