<template>
  <div class="full">
    <div class="header">
      <div class="title" @click="fetchNamespaceGraphData">kiali示例</div>
      <div class="description">展示kiali的网络拓扑图</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="header">
          <div class="title">Namespace:</div>
          <el-select
            v-model="namespaceSelected"
            multiple
            collapse-tags
            placeholder="Namespace"
            size="medium"
          >
            <el-option
              v-for="item in namespaces"
              :label="item.name"
              :value="item.name"
              :key="item.name"
            ></el-option>
          </el-select>

          <div>
            <div class="title">GraphType</div>
            <el-select
              v-model="graphType"
              collapse-tags
              placeholder="graphType"
              size="medium"
            >
              <el-option
                v-for="item in graphTypes"
                :label="item"
                :value="item"
                :key="item"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 底部的namespace列表 -->
        <div class="content">
          <!-- 选中的服务的列表 -->
        </div>
      </div>
      <div class="right">
        <div class="header">头部信息</div>
        <div id="cy"></div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      width="60%"
      style="background: transparent"
      :before-close="handleDialogGraphClose"
      :destroy-on-close="true"
    >
      <DialogGraph
        :display="showDialog"
        :elements="showElements"
        :getElementNeighbordByID="getElementNeighbordByID"
        :styles="styles"
      />
    </el-dialog>
  </div>
</template>
<script>
import cytoscape from 'cytoscape'
import graphStyles from './style.js'
import handleHoverEvents from '../devops/hoverEvent.js'
// 弹出组件
import DialogGraph from '../devops/dialog'
export default {
  name: 'CytoscapeKialiDemo',
  components: { DialogGraph },
  props: {
    styles: {
      type: Array,
      default() {
        return graphStyles
      },
    },
  },
  data() {
    return {
      // kialiServer: 'http://kiali.codelieche.com:31140',
      kialiServer: 'http://kiali.codelieche.com:32078',
      elements: {
        nodes: [],
        edges: [],
      },
      // 获取graph elements参数
      graphType: 'service',
      graphTypes: ['app', 'service', 'versionedApp', 'workload'],
      injectServiceNodes: false,

      // 命名空间
      namespaces: [
        // { name: 'default' },
        // { name: 'kube-system' },
        // { name: 'istio-system' },
        // { name: 'devops' },
      ],
      namespaceSelected: ['default'],

      // 服务列表
      services: [],
      haveEleSelected: false,
      showDialog: false, // 是否显示对话框
      showElements: [], // 对话框要展示的元素
    }
  },
  mounted() {
    this.fetchNamespaceData()
  },
  methods: {
    async fetchNamespaceData() {
      // 需要配置跨域访问
      // 从kiali获取Namespace

      let url = `${this.kialiServer}/kiali/api/namespaces`
      var response = await this.$http.get(url, {
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW4=',
          'Access-Control-Allow-Origin': '*',
        },
      })
      if (response.status === 200) {
        var data = response.data
        // console.log(data)
        if (Array.isArray(data)) {
          this.namespaces = data
          this.checkOrAllNamespace()
        }
      }
    },
    async fetchNamespaceGraphData() {
      // 需要配置跨域访问
      // 从kiali获取Namespace的画图的元素
      // /kiali/api/namespaces/graph?duration=60s&graphType=service&injectServiceNodes=false&appenders=deadNode,sidecarsCheck,serviceEntry,istio&namespaces=default,istio-system
      let url = `${
        this.kialiServer
      }/kiali/api/namespaces/graph?duration=60s&graphType=${
        this.graphType
      }&injectServiceNodes=false&appenders=deadNode,sidecarsCheck,serviceEntry,istio&namespaces=${this.namespaceSelected.join(
        ','
      )}`

      var injectServiceNodes = false
      var appenders = 'deadNode,sidecarsCheck,serviceEntry,istio,responseTime'
      switch (this.graphType) {
        case 'app':
          injectServiceNodes = false
          break
        case 'service':
          injectServiceNodes = false
          break
        case 'versionedApp':
          injectServiceNodes = false
          appenders += '&groupBy=app'
          break
        default:
          injectServiceNodes = false
      }

      url =
        this.kialiServer +
        '/kiali/api/namespaces/graph?duration=60s&graphType=' +
        this.graphType +
        '&injectServiceNodes=' +
        injectServiceNodes +
        '&appenders=' +
        appenders +
        '&namespaces=' +
        this.namespaceSelected.join(',')

      // console.log(url)
      // let url = "http://kiali.codelieche.com:31140/kiali/api/namespaces"
      var response = await this.$http.get(url, {
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW4=',
          'Access-Control-Allow-Origin': '*',
        },
      })
      if (response.status === 200) {
        var data = response.data
        // console.log(data)
        if (data.elements && Array.isArray(data.elements.nodes)) {
          this.elements = data.elements
          this.buildGraph()
        }
      }
    },
    checkOrAllNamespace(isClear = false) {
      if (isClear) {
        this.namespaceSelected = []
      } else {
        var selected = []
        this.namespaces.forEach((item) => {
          selected.push(item.name)
        })
        this.namespaceSelected = selected
      }
    },
    buildGraph() {
      // 销毁已经存在的图形
      this.destroyGraph()

      //   布局名字
      var layoutName = this.elements.nodes.length > 30 ? 'cola' : 'dagre'
      // console.log(this.nodes)
      var cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: this.elements,
        layout: {
          //   name: 'dagre',
          //   name: 'cola', // cytoscape-cola需要这个
          //   name: 'circle',
          name: layoutName,
          fit: true,
          rankDir: 'LR', // 默认是TB
        },
        minZoom: 0.2,
        maxZoom: 2,
      })

      this.cy = cy
      window.cy = cy

      // nodeHtmlLabel
      // cy.nodeHtmlLabel([
      //   {
      //     query: 'node',
      //     cssClass: 'nodeHtmlLabel',
      //     tpl: function (data) {
      //       if (data.isGroup) {
      //         return '<spn>' + '' + '</span>'
      //       } else {
      //         return (
      //           '<div style="color:red;width:36px;height:36px;background:#76a5fc;border-radius:18px">' +
      //           "<img style='width:10px;padding:13px;' src='/img/pod.png' />" +
      //           '</div>'
      //         )
      //       }
      //     },
      //   },
      // ])

      // 事件处理
      handleHoverEvents(cy)
      // 点击事件
      var that = this
      cy.on('click', 'node', (evt) => {
        var ele = evt.target
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
      cy.on('click', 'edge', (evt) => {
        var ele = evt.target
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
      this.setEdgesClasses()
    },

    setEdgesClasses() {
      // 图形渲染之后，检查边，如果traffic.response.200.flag.-在data中为100，就success
      this.cy.edges().forEach((item) => {
        var data = item.data()
        var response200Flag = 0
        var classNames = 'idle'
        try {
          if (data.traffic && data.traffic.responses) {
            if (
              data.traffic.responses['200'] &&
              data.traffic.responses['200'].flags
            ) {
              response200Flag ==
                parseInt(data.traffic.responses['200'].flags['-'], 10)
              if (
                response200Flag >= 100 ||
                data.traffic.responses['200'].flags['-'] === '100.0'
              ) {
                classNames = 'success'
              } else {
                console.log('response200Flag', response200Flag, data)
              }
            }
          }
        } catch {
          console.log('---')
        }
        item.classNames(classNames)
        // if(classNames === "success"){
        //   item.target().addClass("success")
        // }
      })
    },

    // 获取元素的邻居节点
    getElementNeighbordByID(id) {
      var ele = this.cy.$('#' + id)
      var neighborhood = ele.neighborhood()
      var needChangeElementsID = false

      // 判断是否是边
      if (ele.isEdge()) {
        neighborhood = [ele.source(), ele.target()]
      }
      var showElements = [{ data: ele.data(), classes: ele.classes() }]
      for (var i = 0; i < neighborhood.length; i++) {
        var item = neighborhood[i]
        // console.log(i, item)
        if (!needChangeElementsID && item.data().parent) {
          needChangeElementsID = true
        }
        showElements.push({ data: item.data(), classes: item.classes() })
      }

      // 判断是否需要变更ID
      if (needChangeElementsID) {
        // 因为弹出新的图形之后，图形会变乱，所以把元素的ID变更一下，这样关闭弹出的图形也不会让旧的图形变乱了
        // 这里当量很大的时候，性能是个问题，但是这是修复图形变乱问题的唯一方式
        var showElementsStr = JSON.stringify(showElements)
        showElements.map((item) => {
          showElementsStr = showElementsStr.replaceAll(
            item.id,
            `${item.id}-dialog`
          )
        })
        showElements = JSON.parse(showElementsStr)
      }

      // 对新的elements进行赋值
      // console.log(showElements)
      this.showElements = showElements
      this.showDialog = true
    },

    handleDialogGraphClose() {
      // console.log("handleDialogGraphClose")
      this.showDialog = false
      this.showElements = []
      // this.buildGraph()
      this.fetchNamespaceGraphData()
      // window.location.reload();
    },

    randomError(type = 'error') {
      // 随机设置个error
      if (this.cy) {
        var edges = this.cy.edges()
        var index = Math.floor(Math.random() * edges.length)
        if (type === 'success') {
          edges[index].removeClass('warn error')
          edges[index].target().removeClass('warn error')
        }
        edges[index].addClass(type)
        edges[index].target().addClass(type)
      }
    },

    destroyGraph() {
      if (this.cy) {
        this.cy.destroy()
        this.cy = undefined
      }
    },
  },
  watch: {
    namespaceSelected() {
      if (this.namespaceSelected.length > 0) {
        this.fetchNamespaceGraphData()
      }
    },
    graphType() {
      if (this.namespaceSelected.length > 0) {
        this.fetchNamespaceGraphData()
      } else {
        this.$message({
          // showClose: true,
          message: '请选择Namespace',
          type: 'success',
        })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.full {
  display: flex;
  flex-direction: column;
  .header {
    border-bottom: 1px solid #eee;
    .title {
      text-align: center;
      padding: 10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .description {
      color: #777;
      font-size: 14px;
      padding: 2px 10px 5px 10px;
      text-align: left;
      border-left: 4px solid #aaa;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    .left {
      .title {
        text-align: left;
        font-size: 14px;
      }
      width: 200px;
      height: 100%;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      .header {
        padding: 5px;
      }
      .content {
        flex: 1;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .header {
        padding: 5px;
      }
      #cy {
        flex: 1;
      }
    }
  }
}
</style>