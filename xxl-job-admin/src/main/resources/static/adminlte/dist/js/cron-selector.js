


(function ($) {



    $.fn.extend({


        cronSelector: function (rand,elementAttrName,elementAttrValue) {

            window["resultsName"+rand]="";
            window["inputElement"+rand];
            window["displayElement"+rand];


            //create top menu
            var cronContainer = $("<div/>", { id: "CronContainer"+ rand, style: "display:none;width:300px;height:300px;" });

            var mainDiv = $("<div/>", { id: "CronGenMainDiv"+ rand, style: "width:480px;height:270px;" });
            var topMenu = $("<ul/>", { "class": "nav nav-tabs", id: "CronGenTabs"+ rand });
            $('<li/>', { 'class': 'active' }).html($('<a id="MinutesTab'+rand+'" href="#Minutes'+rand+'">分</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="HourlyTab'+rand+'"" href="#Hourly'+rand+'">时</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="DailyTab'+rand+'" href="#Daily'+rand+'">天</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="WeeklyTab'+rand+'" href="#Weekly'+rand+'">周</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="MonthlyTab'+rand+'" href="#Monthly'+rand+'">月</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="YearlyTab'+rand+'" href="#Yearly'+rand+'">年</a>')).appendTo(topMenu);
            $(topMenu).appendTo(mainDiv);

            //create what's inside the tabs
            var container = $("<div/>", { "class": "container-fluid", "style": "margin-top: 10px" });
            var row = $("<div/>", { "class": "row-fluid" });
            var span12 = $("<div/>", { "class": "span12" });
            var tabContent = $("<div/>", { "class": "tab-content" });

            //creating the minutesTab
            var minutesTab = $("<div/>", { "class": "tab-pane active", id: "Minutes"+ rand });
            $(minutesTab).append("从每小时的第 0 分钟开始，每隔&emsp;");
            $("<input/>", { id: "MinutesInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(minutesTab);
            $(minutesTab).append("&emsp;分钟");
            $(minutesTab).appendTo(tabContent);

            //creating the hourlyTab
            var hourlyTab = $("<div/>", { "class": "tab-pane", id: "Hourly"+ rand });

            var hourlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "HourlyRadio"+rand, checked: "checked" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&emsp;从每天的 00:00 开始，每隔&emsp;");
            $("<input/>", { id: "HoursInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&emsp;小时");
            $(hourlyOption1).appendTo(hourlyTab);

            var hourlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "HourlyRadio"+rand }).appendTo(hourlyOption2);
            $(hourlyOption2).append("&emsp;每天的&emsp;");
            $(hourlyOption2).append('<select id="AtHours'+ rand +'" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(hourlyOption2).append('<select id="AtMinutes'+ rand+'" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
            $(hourlyOption2).appendTo(hourlyTab);

            $(hourlyTab).appendTo(tabContent);

            //craeting the dailyTab
            var dailyTab = $("<div/>", { "class": "tab-pane", id: "Daily"+ rand });

            var dailyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "DailyRadio"+rand, checked: "checked" }).appendTo(dailyOption1);
            $(dailyOption1).append("&emsp;从每月的第 1 天开始，每隔&emsp;");
            $("<input/>", { id: "DaysInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(dailyOption1);
            $(dailyOption1).append("&emsp;天");
            $(dailyOption1).appendTo(dailyTab);

            var dailyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "DailyRadio"+rand }).appendTo(dailyOption2);
            $(dailyOption2).append("&emsp;周一到周五");
            $(dailyOption2).appendTo(dailyTab);

            $(dailyTab).append("&emsp;具体时间&emsp;");
            $(dailyTab).append('<select id="DailyHours'+ rand+'" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(dailyTab).append('<select id="DailyMinutes'+ rand+'" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');

            $(dailyTab).appendTo(tabContent);

            //craeting the weeklyTab
            var weeklyTab = $("<div/>", { "class": "tab-pane", id: "Weekly"+ rand });
            var weeklyWell = $("<div/>", { "class": "well well-small" });

            var span31 = $("<div/>", { "class": "span6 col-sm-6" });
            $("<input/>", { type: "checkbox", value: "MON" }).appendTo(span31);
            $(span31).append("&nbsp;星期一<br />");
            $("<input/>", { type: "checkbox", value: "TUE" }).appendTo(span31);
            $(span31).append("&nbsp;星期二<br />");
            $("<input/>", { type: "checkbox", value: "WED" }).appendTo(span31);
            $(span31).append("&nbsp;星期三<br />");
            $("<input/>", { type: "checkbox", value: "THU" }).appendTo(span31);
            $(span31).append("&nbsp;星期四<br />");

            var span32 = $("<div/>", { "class": "span6 col-sm-6" });
            $("<input/>", { type: "checkbox", value: "FRI" }).appendTo(span32);
            $(span32).append("&nbsp;星期五<br />");
            $("<input/>", { type: "checkbox", value: "SAT" }).appendTo(span32);
            $(span32).append("&nbsp;星期六<br />");
            $("<input/>", { type: "checkbox", value: "SUN" }).appendTo(span32);
            $(span32).append("&nbsp;星期日");

            $(span31).appendTo(weeklyWell);
            $(span32).appendTo(weeklyWell);
            //Hack to fix the well box
            $("<br /><br /><br /><br />").appendTo(weeklyWell);

            $(weeklyWell).appendTo(weeklyTab);

            $(weeklyTab).append("&emsp;具体时间&emsp;");
            $(weeklyTab).append('<select id="WeeklyHours'+ rand+'" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(weeklyTab).append('<select id="WeeklyMinutes'+ rand+'" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
            $(weeklyTab).append('<div style="color:#23527c;margin-top:20px;">提示：如果没有选择星期，则默认星期一。</div>');
            $(weeklyTab).appendTo(tabContent);

            //craeting the monthlyTab
            var monthlyTab = $("<div/>", { "class": "tab-pane", id: "Monthly"+ rand });

            var monthlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "MonthlyRadio"+rand, checked: "checked" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&emsp;从1月开始，每隔&emsp;");
            $("<input/>", { id: "MonthInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&emsp;个月的&emsp;");
            $("<input/>", { id: "DayOfMOnthInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&emsp;日&emsp;");
            $(monthlyOption1).appendTo(monthlyTab);

            var monthlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "MonthlyRadio"+rand }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&emsp;每月&emsp;");
            $("<input/>", { id: "EveryMonthInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&emsp;日的&emsp;");
            $(monthlyOption2).append('<select id="WeekDay'+ rand+'"  class="day-order-in-month" style="width: 80px"></select>');
            $(monthlyOption2).append("&nbsp;");
            $(monthlyOption2).append('<select id="DayInWeekOrder'+ rand+'" class="week-days" style="width: 100px"></select>');
            $(monthlyOption2).appendTo(monthlyTab);

            $(monthlyTab).append("&emsp;具体时间&emsp;");
            $(monthlyTab).append('<select id="MonthlyHours'+ rand+'" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(monthlyTab).append('<select id="MonthlyMinutes'+ rand+'" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
            $(monthlyTab).appendTo(tabContent);

            //craeting the yearlyTab
            var yearlyTab = $("<div/>", { "class": "tab-pane", id: "Yearly"+ rand });

            var yearlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "YearlyRadio"+rand, checked: "checked" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("&emsp;每年的&emsp;");
            $(yearlyOption1).append('<select id="MonthsOfYear'+ rand+'" class="months" style="width: 40px"></select>');
            $(yearlyOption1).append("&emsp;月&emsp;");
            $("<input/>", { id: "YearInput"+ rand, type: "text", value: "1", style: "width: 40px" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("&emsp;日&emsp;");
            $(yearlyOption1).appendTo(yearlyTab);

            var yearlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "YearlyRadio"+rand }).appendTo(yearlyOption2);
            $(yearlyOption2).append("&emsp;每年&emsp;");
            $(yearlyOption2).append('<select id="MonthsOfYear2'+ rand+'" class="months" style="width: 40px"></select>');
            $(yearlyOption2).append("&emsp;月的&emsp;");
            $(yearlyOption2).append('<select id="DayOrderInYear'+ rand+'" class="day-order-in-month" style="width: 80px"></select>');
            $(yearlyOption2).append("&nbsp;");
            $(yearlyOption2).append('<select id="DayWeekForYear'+ rand+'" class="week-days" style="width: 100px"></select>');
            $(yearlyOption2).appendTo(yearlyTab);

            $(yearlyTab).append("&emsp;具体时间&emsp;");
            $(yearlyTab).append('<select id="YearlyHours'+ rand+'" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(yearlyTab).append('<select id="YearlyMinutes'+ rand+'" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');

            $(yearlyTab).appendTo(tabContent);
            $(tabContent).appendTo(span12);

            //creating the button and results input
            window["resultsName"+rand] = $(this).prop("id");
            $(this).prop("name", window["resultsName"+rand]);

            $(span12).appendTo(row);
            $(row).appendTo(container);
            $(container).appendTo(mainDiv);
            $(cronContainer).append(mainDiv);

            var footerDiv = $("<div style='text-align: right;'></div>");
            footerDiv.appendTo(cronContainer);
            var okBtn = $("<button id='okBtn"+ rand+"' type='button' class='btn btn-primary'>确定</button>");
            var cancelBtn = $("<button id='cancelBtn"+ rand+"' type='button' class='btn btn-primary'>取消</button>");
            $(okBtn).appendTo(footerDiv);
            footerDiv.append("&emsp;");
            $(cancelBtn).appendTo(footerDiv);

            var that = $(this);

            // Hide the original input
            that.hide();

            // Replace the input with an input group
            var $g = $("<div>").addClass("input-group");
            // Add an input
            var $i = $("<input>", { type: 'text', placeholder: '', readonly: 'readonly' ,name:elementAttrName}).addClass("form-control").val(elementAttrValue);
            $i.appendTo($g);
            // Add the edit button
            var $b = $("<span class='input-group-addon' style='cursor:pointer;'><i class='glyphicon glyphicon-edit'></i><span>");

            $g.append($b);

            $(this).before($g);

            window["inputElement"+rand] = that;
            window["displayElement"+rand] = $i;

            $b.popover({
                html: true,
                content: function () {
                    return $(cronContainer).html();
                },
                template: '<div class="popover" style="max-width:500px !important; width:500px"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
                placement: 'bottom'

            }).on('click', function (e) {
                e.preventDefault();

                fillDataOfMinutesAndHoursSelectOptions();
                fillDayWeekInMonth();
                fillInWeekDays();
                fillInMonths();
                $('#CronGenTabs'+rand+' a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                    //generate();
                });
                $("#CronGenMainDiv"+rand+" select, #CronGenMainDiv"+rand+" input").change(function (e) {
                    generate(rand);
                });

                $('#okBtn'+rand).click(function(){
                    generate(rand);
                    $b.click();
                });

                $('#cancelBtn'+rand).click(function(){
                    $b.click();
                });
            });
            return;
        }
    });


    var fillInMonths = function () {
        var days = [
            { text: "1", val: "1" },
            { text: "2", val: "2" },
            { text: "3", val: "3" },
            { text: "4", val: "4" },
            { text: "5", val: "5" },
            { text: "6", val: "6" },
            { text: "7", val: "7" },
            { text: "8", val: "8" },
            { text: "9", val: "9" },
            { text: "10", val: "10" },
            { text: "11", val: "11" },
            { text: "12", val: "12" }
        ];
        $(".months").each(function () {
            fillOptions(this, days);
        });
    };

    var fillOptions = function (elements, options) {
        for (var i = 0; i < options.length; i++)
            $(elements).append("<option value='" + options[i].val + "'>" + options[i].text + "</option>");
    };
    var fillDataOfMinutesAndHoursSelectOptions = function () {
        for (var i = 0; i < 60; i++) {
            if (i < 24) {
                $(".hours").each(function () { $(this).append(timeSelectOption(i)); });
            }
            $(".minutes").each(function () { $(this).append(timeSelectOption(i)); });
        }
    };
    var fillInWeekDays = function () {
        var days = [
            { text: "星期一", val: "MON" },
            { text: "星期二", val: "TUE" },
            { text: "星期三", val: "WED" },
            { text: "星期四", val: "THU" },
            { text: "星期五", val: "FRI" },
            { text: "星期六", val: "SAT" },
            { text: "星期日", val: "SUN" }
        ];
        $(".week-days").each(function () {
            fillOptions(this, days);
        });

    };
    var fillDayWeekInMonth = function () {
        var days = [
            { text: "第一个", val: "1" },
            { text: "第二个", val: "2" },
            { text: "第三个", val: "3" },
            { text: "第四个", val: "4" }
        ];
        $(".day-order-in-month").each(function () {
            fillOptions(this, days);
        });
    };
    var displayTimeUnit = function (unit) {
        if (unit.toString().length == 1)
            return "0" + unit;
        return unit;
    };
    var timeSelectOption = function (i) {
        return "<option id='" + i + "'>" + displayTimeUnit(i) + "</option>";
    };

    var generate = function (rand) {


        var activeTab = $("ul#CronGenTabs"+rand+" li.active a").prop("id");
        var results = "";
        switch (activeTab) {

            case "MinutesTab"+rand:
                results = "0 0/" + $("#MinutesInput"+rand).val() + " * 1/1 * ? *";
                break;
            case "HourlyTab"+rand:
                switch ($("input:radio[name=HourlyRadio"+rand+"]:checked").val()) {
                    case "1":
                        results = "0 0 0/" + $("#HoursInput"+rand).val() + " 1/1 * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#AtMinutes"+rand).val()) + " " + Number($("#AtHours"+rand).val()) + " 1/1 * ? *";
                        break;
                }
                break;
            case "DailyTab"+rand:
                switch ($("input:radio[name=DailyRadio"+rand+"]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#DailyMinutes"+rand).val()) + " " + Number($("#DailyHours"+rand).val()) + " 1/" + $("#DaysInput"+rand).val() + " * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#DailyMinutes"+rand).val()) + " " + Number($("#DailyHours"+rand).val()) + " ? * MON-FRI *";
                        break;
                }
                break;
            case "WeeklyTab"+rand:
                var selectedDays = "";
                $("#Weekly"+rand+" input:checkbox:checked").each(function () { selectedDays += $(this).val() + ","; });
                if (selectedDays.length > 0){
                    selectedDays = selectedDays.substr(0, selectedDays.length - 1);
                } else {
                    // 未选择周几，给个默认值：周一
                    selectedDays = "MON";
                }
                results = "0 " + Number($("#WeeklyMinutes"+rand).val()) + " " + Number($("#WeeklyHours"+rand).val()) + " ? * " + selectedDays + " *";
                break;
            case "MonthlyTab"+rand:
                switch ($("input:radio[name=MonthlyRadio"+rand+"]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#MonthlyMinutes"+rand).val()) + " " + Number($("#MonthlyHours"+rand).val()) + " " + $("#DayOfMOnthInput"+rand).val() + " 1/" + $("#MonthInput"+rand).val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#MonthlyMinutes"+rand).val()) + " " + Number($("#MonthlyHours"+rand).val()) + " ? 1/" + Number($("#EveryMonthInput"+rand).val()) + " " + $("#DayInWeekOrder"+rand).val() + "#" + $("#WeekDay"+rand).val() + " *";
                        break;
                }
                break;
            case "YearlyTab"+rand:
                switch ($("input:radio[name=YearlyRadio"+rand+"]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#YearlyMinutes"+rand).val()) + " " + Number($("#YearlyHours"+rand).val()) + " " + $("#YearInput"+rand).val() + " " + $("#MonthsOfYear"+rand).val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#YearlyMinutes"+rand).val()) + " " + Number($("#YearlyHours"+rand).val()) + " ? " + $("#MonthsOfYear2"+rand).val() + " " + $("#DayWeekForYear"+rand).val() + "#" + $("#DayOrderInYear"+rand).val() + " *";
                        break;
                }
                break;
        }

        // Update original control

        window["inputElement"+rand].val(results).change();
        // Update display
        window["displayElement"+rand].val(results);
    };

})(jQuery);

