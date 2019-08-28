$(function() {

	// init date tables
	var jobTable = $("#job_list").dataTable({
		"deferRender": true,
		"processing" : true,
	    "serverSide": true,
		"ajax": {
			url: base_url + "/jobinfo/pageList",
			type:"post",
	        data : function ( d ) {
	        	var obj = {};
	        	obj.jobGroup = $('#jobGroup').val();
                obj.triggerStatus = $('#triggerStatus').val();
                obj.jobName = $('#jobName').val();
	        	// obj.executorHandler = $('#executorHandler').val();
                obj.author = $('#author').val();
	        	obj.start = d.start;
	        	obj.length = d.length;
                return obj;
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// scroll x，close self-adaption
	    "columns": [
	                {
	                	"data": 'id',
						"bSortable": false,
						"visible" : true,
						"width":'10%'
					},
					{
						"data": 'jobName',
						"visible" : true,
						"width":'25%'
					},
	                {
	                	"data": 'jobGroup',
	                	"visible" : true,
	                	"render": function ( data, type, row ) {
	            			var groupMenu = $("#jobGroup").find("option");
	            			for ( var index in $("#jobGroup").find("option")) {
	            				if ($(groupMenu[index]).attr('value') == data) {
									return $(groupMenu[index]).html();
								}
							}
	            			return data;
	            		}
            		},
/*	                {
	                	"data": 'jobDesc',
						"visible" : true,
						"width":'25%'
					},*/
/*					{
						"data": 'glueType',
						"width":'25%',
						"visible" : true,
						"render": function ( data, type, row ) {
							var glueTypeTitle = findGlueTypeTitle(row.glueType);
                            if (row.executorHandler) {
                                return glueTypeTitle +"：" + row.executorHandler;
                            } else {
                                return glueTypeTitle;
                            }
						}
					},*/
	                { "data": 'executorParam', "visible" : false},
					{
						"data": 'jobCron',
						"visible" : true,
						"width":'10%'
					},
	                {
	                	"data": 'addTime',
	                	"visible" : false,
	                	"render": function ( data, type, row ) {
	                		return data?moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss"):"";
	                	}
	                },
	                {
	                	"data": 'updateTime',
	                	"visible" : false,
	                	"render": function ( data, type, row ) {
	                		return data?moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss"):"";
	                	}
	                },
	                { "data": 'author', "visible" : true, "width":'10%'},
	                { "data": 'alarmEmail', "visible" : false},
	                {
	                	"data": 'triggerStatus',
						"width":'10%',
	                	"visible" : true,
	                	"render": function ( data, type, row ) {
                            // status
                            if (1 == data) {
                                return '<small class="label label-success" ><i class="fa fa-clock-o"></i>RUNNING</small>';
                            } else {
                                return '<small class="label label-default" ><i class="fa fa-clock-o"></i>STOP</small>';
                            }
	                		return data;
	                	}
	                },
	                {
						"data": I18n.system_opt ,
						"width":'10%',
	                	"render": function ( data, type, row ) {
	                		return function(){

                                // status
                                var start_stop_div = "";
                                if (1 == row.triggerStatus ) {
                                    start_stop_div = '<li><a href="javascript:void(0);" class="job_operate" _type="job_pause" >'+ I18n.jobinfo_opt_stop +'</a></li>\n';
                                } else {
                                    start_stop_div = '<li><a href="javascript:void(0);" class="job_operate" _type="job_resume" >'+ I18n.jobinfo_opt_start +'</a></li>\n';
                                }

                                // log url
                                var logHref = base_url +'/joblog?jobId='+ row.id;

                                // log url
                                var codeBtn = "";
                                if ('BEAN' != row.glueType) {
                                    var codeUrl = base_url +'/jobcode?jobId='+ row.id;
                                    codeBtn = '<li><a href="'+ codeUrl +'" target="_blank" >GLUE IDE</a></li>\n';
                                }

                                // data
                                tableData['key'+row.id] = row;

                                // opt
                                var html = '<div class="btn-group">\n' +
                                    '     <button type="button" class="btn btn-primary btn-sm">'+ I18n.system_opt +'</button>\n' +
                                    '     <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">\n' +
                                    '       <span class="caret"></span>\n' +
                                    '       <span class="sr-only">Toggle Dropdown</span>\n' +
                                    '     </button>\n' +
                                    '     <ul class="dropdown-menu" role="menu" _id="'+ row.id +'" >\n' +
                                    '       <li><a href="javascript:void(0);" class="job_trigger" >'+ I18n.jobinfo_opt_run +'</a></li>\n' +
                                    '       <li><a href="'+ logHref +'">'+ I18n.jobinfo_opt_log +'</a></li>\n' +
                                    '       <li><a href="javascript:void(0);" class="job_registryinfo" >' + I18n.jobinfo_opt_registryinfo + '</a></li>\n' +
                                    '      <li><a href="javascript:void(0);" class="jobinfo_view_dag" >' + I18n.jobinfo_view_dag + '</a></li>\n' +
                                    '       <li class="divider"></li>\n' +
                                    start_stop_div +
                                    codeBtn +
                                    '       <li><a href="javascript:void(0);" class="update" >'+ I18n.system_opt_edit +'</a></li>\n' +
                                    '       <li><a href="javascript:void(0);" class="job_operate" _type="job_del" >'+ I18n.system_opt_del +'</a></li>\n' +
                                    '     </ul>\n' +
                                    '   </div>';

	                			return html;
							};
	                	}
	                }
	            ],
		"language" : {
			"sProcessing" : I18n.dataTable_sProcessing ,
			"sLengthMenu" : I18n.dataTable_sLengthMenu ,
			"sZeroRecords" : I18n.dataTable_sZeroRecords ,
			"sInfo" : I18n.dataTable_sInfo ,
			"sInfoEmpty" : I18n.dataTable_sInfoEmpty ,
			"sInfoFiltered" : I18n.dataTable_sInfoFiltered ,
			"sInfoPostFix" : "",
			"sSearch" : I18n.dataTable_sSearch ,
			"sUrl" : "",
			"sEmptyTable" : I18n.dataTable_sEmptyTable ,
			"sLoadingRecords" : I18n.dataTable_sLoadingRecords ,
			"sInfoThousands" : ",",
			"oPaginate" : {
				"sFirst" : I18n.dataTable_sFirst ,
				"sPrevious" : I18n.dataTable_sPrevious ,
				"sNext" : I18n.dataTable_sNext ,
				"sLast" : I18n.dataTable_sLast
			},
			"oAria" : {
				"sSortAscending" : I18n.dataTable_sSortAscending ,
				"sSortDescending" : I18n.dataTable_sSortDescending
			}
		}
	});

    // table data
    var tableData = {};

	// search btn
	$('#searchBtn').on('click', function(){
		jobTable.fnDraw();
	});

	// jobGroup change
	$('#jobGroup').on('change', function(){
        //reload
        var jobGroup = $('#jobGroup').val();
        window.location.href = base_url + "/jobinfo?jobGroup=" + jobGroup;
    });

	// job operate
	$("#job_list").on('click', '.job_operate',function() {
		var typeName;
		var url;
		var needFresh = false;

		var type = $(this).attr("_type");
		if ("job_pause" == type) {
			typeName = I18n.jobinfo_opt_stop ;
			url = base_url + "/jobinfo/stop";
			needFresh = true;
		} else if ("job_resume" == type) {
			typeName = I18n.jobinfo_opt_start ;
			url = base_url + "/jobinfo/start";
			needFresh = true;
		} else if ("job_del" == type) {
			typeName = I18n.system_opt_del ;
			url = base_url + "/jobinfo/remove";
			needFresh = true;
		} else {
			return;
		}

		var id = $(this).parents('ul').attr("_id");

		layer.confirm( I18n.system_ok + typeName + '?', {
			icon: 3,
			title: I18n.system_tips ,
            btn: [ I18n.system_ok, I18n.system_cancel ]
		}, function(index){
			layer.close(index);

			$.ajax({
				type : 'POST',
				url : url,
				data : {
					"id" : id
				},
				dataType : "json",
				success : function(data){
					if (data.code == 200) {
                        layer.msg( typeName + I18n.system_success );
                        if (needFresh) {
                            //window.location.reload();
                            jobTable.fnDraw(false);
                        }
					} else {
                        layer.msg( data.msg || typeName + I18n.system_fail );
					}
				}
			});
		});
	});

    // job trigger
    $("#job_list").on('click', '.job_trigger',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        $("#jobTriggerModal .form input[name='id']").val( row.id );
        $("#jobTriggerModal .form textarea[name='executorParam']").val( row.executorParam );

        $('#jobTriggerModal').modal({backdrop: false, keyboard: false}).modal('show');
    });
    $("#jobTriggerModal .ok").on('click',function() {
        $.ajax({
            type : 'POST',
            url : base_url + "/jobinfo/trigger",
            data : {
                "id" : $("#jobTriggerModal .form input[name='id']").val(),
                "executorParam" : $("#jobTriggerModal .textarea[name='executorParam']").val()
            },
            dataType : "json",
            success : function(data){
                if (data.code == 200) {
                    $('#jobTriggerModal').modal('hide');

                    layer.msg( I18n.jobinfo_opt_run + I18n.system_success );
                } else {
                    layer.msg( data.msg || I18n.jobinfo_opt_run + I18n.system_fail );
                }
            }
        });
    });
    $("#jobTriggerModal").on('hide.bs.modal', function () {
        $("#jobTriggerModal .form")[0].reset();
    });


    // job registryinfo
    $("#job_list").on('click', '.job_registryinfo',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        var jobGroup = row.jobGroup;

        $.ajax({
            type : 'POST',
            url : base_url + "/jobgroup/loadById",
            data : {
                "id" : jobGroup
            },
            dataType : "json",
            success : function(data){

                var html = '<center>';
                if (data.code == 200 && data.content.registryList) {
                    for (var index in data.content.registryList) {
                        html += '<span class="badge bg-green" >' + data.content.registryList[index] + '</span><br>';
                    }
                }
                html += '</center>';

                layer.open({
                    title: I18n.jobinfo_opt_registryinfo ,
                    btn: [ I18n.system_ok ],
                    content: html
                });

            }
        });



    });

	// add
	$(".add").click(function(){

		// init
        //$("#addModal .form input[name='jobCron']").cronGen({});

		$('#addModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var addModalValidate = $("#addModal .form").validate({
		errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,
        rules : {
			jobName : {
                required : false,
                maxlength: 50
            },
			/*jobDesc : {
				required : false,
				maxlength: 50
			},*/
            jobCron : {
            	required : true
            },
			author : {
				required : true
			},
            executorTimeout : {
                digits:true
            },
            executorFailRetryCount : {
                digits:true
            }
        },
        messages : {
            jobName : {
            	required : I18n.system_please_input + I18n.jobinfo_field_jobname
            },
            jobCron : {
            	required : I18n.system_please_input + "Cron"
            },
            author : {
            	required : I18n.system_please_input + I18n.jobinfo_field_author
            },
            executorTimeout : {
                digits: I18n.system_please_input + I18n.system_digits
            },
            executorFailRetryCount : {
                digits: I18n.system_please_input + I18n.system_digits
            }
        },
		highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement : function(error, element) {
            element.parent('div').append(error);
        },
        submitHandler : function(form) {

			// process
            var executorTimeout = -1;

            $("#addModal .form input[name='executorTimeout']").val(executorTimeout);
            var executorFailRetryCount = $("#addModal .form input[name='executorFailRetryCount']").val();
            if(!/^\d+$/.test(executorFailRetryCount)) {
                executorFailRetryCount = 0;
            }
            $("#addModal .form input[name='executorFailRetryCount']").val(executorFailRetryCount);


        	$.post(base_url + "/jobinfo/add",  $("#addModal .form").serialize(), function(data, status) {
    			if (data.code == "200") {
					$('#addModal').modal('hide');
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: I18n.system_add_suc ,
						icon: '1',
						end: function(layero, index){
							jobTable.fnDraw();
							//window.location.reload();
						}
					});
    			} else {
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: (data.msg || I18n.system_add_fail),
						icon: '2'
					});
    			}
    		});
		}
	});
	$("#addModal").on('hide.bs.modal', function () {
		$("#addModal .form")[0].reset();
		addModalValidate.resetForm();
		$("#addModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote

		$("#addModal .form input[name='executorHandler']").removeAttr("readonly");
	});


    // glueType change
    $(".glueType").change(function(){
		// executorHandler
        var $executorHandler = $(this).parents("form").find("input[name='executorHandler']");
        var glueType = $(this).val();
        if ('BEAN' != glueType) {
            $executorHandler.val("");
            $executorHandler.attr("readonly","readonly");
        } else {
            $executorHandler.removeAttr("readonly");
        }
    });

	$("#addModal .glueType").change(function(){
		// glueSource
		var glueType = $(this).val();
		if ('GLUE_GROOVY'==glueType){
			$("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_java").val() );
		} else if ('GLUE_SHELL'==glueType){
			$("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_shell").val() );
		} else if ('GLUE_PYTHON'==glueType){
			$("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_python").val() );
		} else if ('GLUE_PHP'==glueType){
            $("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_php").val() );
        } else if ('GLUE_NODEJS'==glueType){
			$("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_nodejs").val() );
		} else if ('GLUE_POWERSHELL'==glueType){
            $("#addModal .form textarea[name='glueSource']").val( $("#addModal .form .glueSource_powershell").val() );
        } else {
            $("#addModal .form textarea[name='glueSource']").val("");
		}
	});

	// update
	$("#job_list").on('click', '.update',function() {

        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

		// base data
		$("#updateModal .form input[name='id']").val( row.id );
		$('#updateModal .form select[name=jobGroup] option[value='+ row.jobGroup +']').prop('selected', true);
		$("#updateModal .form input[name='jobName']").val( row.jobName );
        $("#updateModal .form textarea[name='jobDesc']").val( row.jobDesc );
		$("#updateModal .form input[name='jobCron']").val( row.jobCron );
		$("#updateModal .form input[name='author']").val( row.author );
		$("#updateModal .form input[name='alarmEmail']").val( row.alarmEmail );
		$("#updateModal .form input[name='executorTimeout']").val( row.executorTimeout );
        $("#updateModal .form input[name='executorFailRetryCount']").val( row.executorFailRetryCount );
		$('#updateModal .form select[name=executorRouteStrategy] option[value='+ row.executorRouteStrategy +']').prop('selected', true);
		$("#updateModal .form input[name='executorHandler']").val( row.executorHandler );
		$("#updateModal .form textarea[name='executorParam']").val( row.executorParam );
        $("#updateModal .form input[name='childJobId']").val( row.childJobId );
		$('#updateModal .form select[name=executorBlockStrategy] option[value='+ row.executorBlockStrategy +']').prop('selected', true);
		$('#updateModal .form select[name=glueType] option[value='+ row.glueType +']').prop('selected', true);
        $("#updateModal .form textarea[name='upStreamJobList']").val( row.upStreamJobList );
        $("#updateModal .form select[name=glueType]").change();

        // init
        //$("#updateModal .form input[name='jobCron']").cronGen({});

		// show
		$('#updateModal').modal({backdrop: false, keyboard: false}).modal('show');


	});
	var updateModalValidate = $("#updateModal .form").validate({
		errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,

		rules : {
			/*jobDesc : {
				required : false,
				maxlength: 50
			},*/
			jobCron : {
				required : true
			},
			author : {
				required : true
			},
            executorTimeout : {
                digits:true
            },
            executorFailRetryCount : {
                digits:true
            }
		},
		messages : {
			jobName : {
                required : I18n.system_please_input + I18n.jobinfo_field_jobname
			},
            /*jobDesc : {
                required : I18n.system_please_input + I18n.jobinfo_field_jobdesc
            },*/
			jobCron : {
				required : I18n.system_please_input + "Cron"
			},
			author : {
				required : I18n.system_please_input + I18n.jobinfo_field_author
			},
            executorTimeout : {
                digits: I18n.system_please_input + I18n.system_digits
            },
            executorFailRetryCount : {
                digits: I18n.system_please_input + I18n.system_digits
            }
		},
		highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement : function(error, element) {
            element.parent('div').append(error);
        },
        submitHandler : function(form) {

            // process
            var executorTimeout = -1;

            $("#updateModal .form input[name='executorTimeout']").val(executorTimeout);
            var executorFailRetryCount = $("#updateModal .form input[name='executorFailRetryCount']").val();
            if(!/^\d+$/.test(executorFailRetryCount)) {
                executorFailRetryCount = 0;
            }
            $("#updateModal .form input[name='executorFailRetryCount']").val(executorFailRetryCount);

			// post
    		$.post(base_url + "/jobinfo/update", $("#updateModal .form").serialize(), function(data, status) {
    			if (data.code == "200") {
					$('#updateModal').modal('hide');
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: I18n.system_update_suc ,
						icon: '1',
						end: function(layero, index){
							//window.location.reload();
							jobTable.fnDraw();
						}
					});
    			} else {
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: (data.msg || I18n.system_update_fail ),
						icon: '2'
					});
    			}
    		});
		}
	});
	$("#updateModal").on('hide.bs.modal', function () {
		$("#updateModal .form")[0].reset()
	});

    /**
	 * find title by name, GlueType
     */
	function findGlueTypeTitle(glueType) {
		var glueTypeTitle;
        $("#addModal .form select[name=glueType] option").each(function () {
            var name = $(this).val();
            var title = $(this).text();
            if (glueType == name) {
                glueTypeTitle = title;
                return false
            }
        });
        return glueTypeTitle;
    }



    $(".popoverDoubleBox").on('click',function() {

        $('#doubleBox').modal({backdrop: false, keyboard: false}).modal('show');

        //清空原有数据
		$(".ue-container .filter").each(function(){$(this).val("")});
		$('#doubleChoose').empty();
		$("#bootstrap-duallistbox-selected-list_doubleChoose").empty();
        $("#bootstrap-duallistbox-nonselected-list_doubleChoose").empty();

		//当前弹出的doubleBox时，标记是add/update
        var modal = $(this).attr("modal");
        $('#doubleBox').attr("modal",modal);

        //所有任务
        var allList = new Map();
        //未依赖的任务
        var nonSelectedList = new Array();
        //依赖的任务
        var selectedList = new Array();

        //【读取所有任务】从第一条开始读取
        var start = 0;
        //【读取所有任务】每次读100条
        var length = 200;
        //读取所有任务
        while (true){
        	var isBreak = true;
			$.ajax({
				type : 'POST',
                timeout : 3000,
				url: base_url + "/jobinfo/pageList",
				data : {
					"jobGroup":0,
					"triggerStatus":-1,
					"start" : start,
					"length":length
				},
				async:false,
				dataType : "json",
				success : function(data){
					if(data.data.length>0){
                        start = start + length;
                        isBreak = false;
					}

                    data.data.forEach(function (jobInfo) {
                        if(parseInt($("#"+modal+" .form input[name='id']").val())!=jobInfo.id){
                            allList.set(jobInfo.id,jobInfo.jobName);
                        }
                    })
				}
			});
			
			if (isBreak==true){
                break;
			}
        }

		//在doublebox显示依赖的“上游任务”
        var upStreamJobList = $("#"+modal+" .form textarea[name='upStreamJobList']").val();
		if(upStreamJobList!=""){
            upStreamJobList.split(",").forEach(function (value) {
                var jobId = parseInt(value);
            	if(allList.has(jobId)){
                	selectedList.push({"roleId":jobId,"roleName":"["+jobId+"] "+allList.get(jobId)});

                    //为简化代码，把selectedList从allList去掉，以供nonSelectedList使用
                    allList.delete(jobId);
                }
            });
		}

        //在doublebox显示未依赖的“上游任务”
        allList.forEach(function (jobName,jobId) {
        	if(parseInt($("#"+modal+" .form input[name='id']").val())!=jobId){
            	nonSelectedList.push({"roleId":jobId,"roleName":"["+jobId+"] "+jobName});
            }
        });

        $("#doubleChoose").doublebox({
            nonSelectedListLabel: '任务列表',
            selectedListLabel: '选择的上游任务列表',
            preserveSelectionOnMove: 'moved',
            moveOnSelect: false,
            nonSelectedList:nonSelectedList,
            selectedList:selectedList,
            optionValue:"roleId",
            optionText:"roleName",
            doubleMove:true,
        });

    });

    $(".flushUpStreaJobListBox").on('click',function() {
        //获取选择的上游任务
		var chooseList = $('#bootstrap-duallistbox-selected-list_doubleChoose option').map(function () {
            return this.value;
        }).get().join(",");

		var modal = $('#doubleBox').attr("modal");
        $("#"+modal+" .form textarea[name='upStreamJobList']").val( chooseList );
    });

    //查看dag
    $("#job_list").on('click', '.jobinfo_view_dag',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        var jobGroup = row.jobGroup;

        var date = new Date();
        var month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
        var day = date.getDate()<10?"0"+date.getDate():date.getDate();
        time=date.getFullYear()+"-"+month+"-"+day;

        var url = base_url + "/jobinfo/dag?jobId="+id+"&filterTime="+time;
        var iHeight = 500;
		var iWidth = 960;
        var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
        var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;

        var o = $.extend({
            link: url,
            height: 500,
            width: 960
        });
        window.open(url, "newWindow"+Math.random(), "height=" + iHeight + ",width=" + iWidth + ",top="+iTop+",left="+iLeft+",toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no");

    });
});
