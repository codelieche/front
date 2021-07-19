/**
 * 通过传递URL和optionFields生成Choice列表
 * 示例：
 *     url: /api/v1/account/user/
 *     fields: [
 *           {target: 'value', source: 'id'},
 *           {target: 'label', source: ['username', 'nick_name'], separator: '-'}
 *     ]
 *     callback: 处理完之后的处理函数
 */
import fetchApi from '@/api/fetchApi'

const useFetchChoices = (url, fields, callback, listDataPath = null) => {
  //   console.log(url, fields, callback)
  // 先对数据进行校验
  if (!url) {
    console.log('url为空：')
    return
  }

  // 开始获取数据
  fetchApi
    .get(url)
    .then(response => response.data)
    .then(responseData => {
      let dataSource = []
      if (Array.isArray(responseData)) {
        dataSource = responseData
      } else if (typeof responseData === 'object') {
        // 不同后端可能会不一样，字段不一样
        if (!listDataPath) {
          // listDataPath为空、null、undefined都默认从下面2个选项中获取列表数据
          const listFields = ['results', 'data']
          for (var index in listFields) {
            const item = listFields[index]
            if (responseData[item] && Array.isArray(responseData[item])) {
              dataSource = responseData[item]
              break
            }
          }
        } else if (listDataPath && typeof listDataPath === 'string') {
          // 通过.分割, 然后层层获取：比如：.results、.data.results、.list
          let data = responseData
          listDataPath.split('.').forEach(item => {
            if (item && typeof data === 'object') {
              data = data[item]
            }
          })
          // 需要对处理后的数据做个判断
          if (Array.isArray(data)) {
            dataSource = data
          }
        }
      }
      // 获取到了源数据，开始构造Choice
      // console.log('dataSource:', dataSource)
      // 获取到了列表数据
      const choices = []
      dataSource.forEach(item => {
        const itemChoice = {}
        // 处理字段:
        fields.forEach(field => {
          // field示例：{target: 'value', source: 'id'}
          if (item && field.target) {
            const valueField = field.source
            // valueField是有三种情况的：1. 字符；2. 数组；3. 处理函数
            if (valueField && typeof valueField === 'string') {
              itemChoice[field.target] = item[field.source]
            } else if (valueField && Array.isArray(valueField)) {
              const separator =
                field.separator !== undefined ? field.separator : '-'
              const values = []
              valueField.forEach(f => {
                if (item[f] !== undefined) {
                  values.push(item[f])
                }
              })
              // 组合值: 其实应该判断一下values是否为空的
              if (values) {
                itemChoice[field.target] = values.join(separator)
              }
            } else {
              // 未传递valueField那么就判断是否传递了handleFunc
              if (field.handleFunc && typeof field.handleFunc === 'function') {
                itemChoice[field.target] = field.handleFunc(item)
              }
            }
            // console.log('itemChoice:', itemChoice)
          }
        })
        // fields处理完毕，把组合的itemChoice加入到choices中
        if (itemChoice !== {}) {
          choices.push(itemChoice)
        }
      })
      // 判断是否传递了callback
      if (callback && typeof callback === 'function') {
        if (Array.isArray(choices)) {
          callback(choices)
        } else {
          console.log('choices不是列表', choices)
        }
      } else {
        console.log('获取到了选项：')
        console.table(choices)
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export default useFetchChoices
