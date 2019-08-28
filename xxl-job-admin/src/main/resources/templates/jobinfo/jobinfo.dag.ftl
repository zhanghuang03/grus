<!DOCTYPE html>

<meta charset="utf-8">
<#import "../common/common.macro.ftl" as netCommon>
<@netCommon.commonStyle />

<title>当日任务最后一次运行的状态</title>
<script src="${request.contextPath}/static/adminlte/bower_components/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="${request.contextPath}/static/adminlte/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
<link rel="stylesheet" href="${request.contextPath}/static/plugins/d3/graph.css">

<script src="${request.contextPath}/static/plugins/d3/d3.min.js"></script>
<script src="${request.contextPath}/static/plugins/d3/dagre-d3.js"></script>
<script src="${request.contextPath}/static/plugins/d3/diag.js"></script>

<#-- i18n -->
<#global I18n = I18nUtil.getMultString()?eval />
    <script>
        var base_url = '${request.contextPath}';
        var I18n = ${I18nUtil.getMultString()};
    </script>


<div class="col-xs-4">
    <div class="input-group">
        <span class="input-group-addon">
        ${I18n.joblog_field_triggerTime}
        </span>
        <input type="text" class="form-control" id="filterTime" readonly >
    </div>
</div>
<div class="legend_item_box_1">
    <div class="legend_item_box_2">
        <div class="legend_item state" style="border-color: white;background-color: white; cursor: pointer;">${I18n.system_init}</div>
        <div class="legend_item state" style="border-color: white;background-color: rgba(128, 128, 128, 0.8);cursor: pointer;">${I18n.system_wait}</div>
        <div class="legend_item state" style="border-color: white;background-color: rgba(0, 255, 0, 0.8); cursor: pointer;">${I18n.system_run}</div>
        <div class="legend_item state" style="border-color: white;background-color: rgba(0, 128, 0, 0.8); cursor: pointer;">${I18n.system_success}</div>
        <div class="legend_item state" style="border-color: white;background-color: rgb(255, 0, 0, 0.8);cursor: pointer;">${I18n.system_fail}</div>
    </div>
</div>

 <svg id="svgCanvas" width=100% height=100% ></svg>

<ul id="myMenu" class="dropdown-menu" role="menu" _id="82">
    <li><a id="jobLog" href="#" target="_blank">${I18n.jobinfo_opt_log}</a></li>
    <li class="divider"></li>
    <li><a id="jobCode" href="#" target="_blank">GLUE IDE</a></li>
</ul>

<script>


    var jResponse = JSON.parse(${response});
    var data = jResponse.data;

    //默认选中的点
    var statePoint = jResponse.statePoint;
    //定义点
    var state = new Array();
    //定义边
    var edg = new Array();

    for (var i = 0; i < data.length; i++) {
        var _id = Number(data[i]["id"]);
        var state_obj = { id: _id, label: data[i]["jobName"], class: data[i]["class"]};
        state.push(state_obj);
    }

    for (var i = 0; i < data.length; i++) {
        var _id = Number(data[i]["id"]);
        var upstream_list = data[i]["upStreamJobList"].split(",");
        for (var j = 0; j < upstream_list.length; j++) {
            var _start = Number(upstream_list[j]);
            if (_start != "") {
                var edg_obj = { start: _start, end: _id, option: {} };
                edg.push(edg_obj);
            }
        }
    }

    diagGraph.init(statePoint, state, edg); //创建关系图

    var svgCanvas = document.getElementById('svgCanvas'); //绑定事件鼠标点击
    svgCanvas.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'rect') {
            diagGraph.changePoint(e.target.parentNode.id);
        }
    })

    function changeMeun(jobId){
        $("#jobLog").attr("href","${request.contextPath}/joblog?jobId="+jobId);
        $("#jobCode").attr("href","${request.contextPath}/joblog?jobId="+jobId);
    }

    var myMenu = document.getElementById("myMenu"); //鼠标右键
    svgCanvas.addEventListener("contextmenu", (event) => { //鼠标右击事件
        event.preventDefault();
    diagGraph.changePoint(event.target.parentNode.id);

    if (event.target.tagName === 'rect') {
        myMenu.style.top = event.clientY + "px";
        myMenu.style.left = event.clientX + "px";
        myMenu.style.display = 'block';

        var node_id = event.path[1].id;
        changeMeun(node_id);
        console.log("jobId:"+node_id);
    }
    });


    document.addEventListener("click", function(event){
        myMenu.style.display = 'none'
    });

</script>
<script src="${request.contextPath}/static/adminlte/bower_components/moment/moment.min.js"></script>
<script src="${request.contextPath}/static/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script>

    // filter Time
    var rangesConf = {};
    rangesConf[I18n.daterangepicker_ranges_recent_hour] = [moment().subtract(1, 'hours'), moment()];
    rangesConf[I18n.daterangepicker_ranges_today] = [moment().startOf('day'), moment().endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_yesterday] = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_this_month] = [moment().startOf('month'), moment().endOf('month')];
    rangesConf[I18n.daterangepicker_ranges_last_month] = [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')];
    rangesConf[I18n.daterangepicker_ranges_recent_week] = [moment().subtract(1, 'weeks').startOf('day'), moment().endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_recent_month] = [moment().subtract(1, 'months').startOf('day'), moment().endOf('day')];

    $('#filterTime').daterangepicker({
        singleDatePicker: true,
        autoApply:false,
        showDropdowns:false,        // 是否显示年月选择条件
        timePicker: false, 			// 是否显示小时和分钟选择条件
        timePickerIncrement: 10, 	// 时间的增量，单位为分钟
        timePicker24Hour : true,
        opens : 'left', //日期选择框的弹出位置
        ranges: rangesConf,
        locale : {
            format: 'YYYY-MM-DD',
            customRangeLabel : I18n.daterangepicker_custom_name ,
            applyLabel : I18n.system_ok ,
            cancelLabel : I18n.system_cancel ,
            fromLabel : I18n.daterangepicker_custom_starttime ,
            daysOfWeek : I18n.daterangepicker_custom_daysofweek.split(',') ,        // '日', '一', '二', '三', '四', '五', '六'
            monthNames : I18n.daterangepicker_custom_monthnames.split(',') ,        // '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
            firstDay : 1
        }
    });

    $("#filterTime").val(window.location.href.split("&filterTime=")[1]);

    $('#filterTime').on("change",function () {
        var jobId = ${jobId};
        window.location.href="${request.contextPath}/jobinfo/dag?jobId="+jobId+"&filterTime="+$('#filterTime').val();
    });

</script>