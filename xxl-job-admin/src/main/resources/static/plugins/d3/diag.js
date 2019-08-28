var diagGraph = { //diag图数据操作
    state: [],
    edg: [],
    statePoint: '',
    g: '',
    zoom: null,
    after: null,
    render: null,
    svg: null,
    init: function(statePoint, state, edg) {
        this.statePoint = statePoint;
        this.state = state;
        this.edg = edg;
        this.createG();
        this.renderG();
    },

    createG: function() {
        this.g = new dagreD3.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() {
            return {};
        });

        render = new dagreD3.render();
        svg = d3.select("#svgCanvas");
        var svgGroup = svg.append("g");
        var inner = svg.select("g");

        var zoom = d3.zoom().on("zoom",
        function() { //放大
            inner.attr("transform", d3.event.transform);
        });

        svg.call(zoom);

        this.drawNode();
        this.drawEdg();
        render(d3.select("svg g"), this.g); //渲染节点


        //缩放倍数
        var scale = 1.2;
        //转成translate坐标系
        svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(scale));

        //可见坐标轴长度
        var axisVisLenX = svg._groups[0][0].clientWidth;
        var axisVisLenY = svg._groups[0][0].clientHeight;

        // g-root偏移原点坐标
        var gRootX = (svg._groups[0][0]).getElementsByTagName("g")[0].transform.baseVal[0].matrix.e;
        var gRootY = (svg._groups[0][0]).getElementsByTagName("g")[0].transform.baseVal[0].matrix.f;



        // 选中节点偏移g-root坐标
        var statePointX = (svg._groups[0][0]).getElementById(this.statePoint).transform.baseVal[0].matrix.e;
        var statePointY = (svg._groups[0][0]).getElementById(this.statePoint).transform.baseVal[0].matrix.f;


        // 选中节点偏移原点坐标 = g-root偏移原点坐标 + 选中节点偏移g-root坐标
        var totalTlX = statePointX + gRootX;
        var totalTly = statePointY + gRootY;

         

        // 把选中节点居中于可见区域，将g-root移动
        var nodeX = (totalTlX * scale - axisVisLenX / 2) * -1 ;
        var nodeY = (totalTly * scale - axisVisLenY / 2) * -1 ;
        svg.call(zoom.transform, d3.zoomIdentity.translate(nodeX, nodeY).scale(scale));


    },

    drawNode: function() {
        for (let i in this.state) { //画点
            let el = this.state[i];
            let style = '';
            if (el.id === this.statePoint) {
                style = "stroke-dasharray:4; stroke: #0fb2cc;;stroke-width: 4px;"
            }
            this.g.setNode(el.id, {
                id: el.id,
                label: el.label,
                class: el.class,
                style: style,
            });
        }
        this.g.nodes().forEach((v) => { //画圆角
            var node = this.g.node(v);
            // Round the corners of the nodes
            node.rx = node.ry = 5;
        });
    },
    drawEdg: function() {
        for (let i in this.edg) { // 画连线
            let el = this.edg[i]
            if (el.start === this.statePoint || el.end === this.statePoint) {
                this.g.setEdge(el.start, el.end, {
                    style: "stroke: #0fb2cc; fill: none;stroke-dasharray:5;stroke-width: 2px;",
                    arrowheadStyle: "fill: #0fb2cc;stroke: #0fb2cc;stroke-dasharray:5",
                    arrowhead: 'vee'
                });
            } else {
                this.g.setEdge(el.start, el.end, {
                    arrowhead: 'vee'
                });
            }
        }
    },

    renderG: function() {
        this.drawNode();
        this.drawEdg();
        render(d3.select("svg g"), this.g); //渲染节点
    },
    changePoint: function(point) {
        this.statePoint = point * 1.0;
        this.renderG()
    }
}