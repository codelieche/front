const Mock = require('mockjs')

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = ['132', '136', '138', '170', '186', '189'] // 手机号前缀
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) // 手机号
  }
})

export default []
