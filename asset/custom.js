var timer, mode, setting = [[120, 2, 9, 1, 1, 1, 0, 2, 4], [120, 10, 99, 1, 1, 0, 0, 4, 3], [120, 2, 99, 0, 0, 1, 1, 6, 2]];
var opList, op, time, score, num1, num2, ans;

function countdown() {
    if (time > 0) {
        time--;
        $("#time").text((time/100).toFixed(2));
    } else {
        clearInterval(timer);
        $(".question").hide();
        $(".option").show();
        $("#btn-start").show();
        var interval = 10;
        if (score <= interval) {
            $("#message").text("你得到名為Gummy的爛泥怪！");
            $("#pokemon").attr("src", "asset/img/Q-88.png");
        } else if (score <= interval * 2) {
            $("#message").text("你得到名為Rocky的小拳石！");
            $("#pokemon").attr("src", "asset/img/P-74.png");
        } else if (score <= interval * 3) {
            $("#message").text("你得到名為Godzilla的鐵甲犀牛！");
            $("#pokemon").attr("src", "asset/img/O-111.png");
        } else if (score <= interval * 4) {
            $("#message").text("你得到名為Diaval的大顎蟻！");
            $("#pokemon").attr("src", "asset/img/N-328.png");
        } else if (score <= interval * 5) {
            $("#message").text("你得到名為Bruce的巴爾郎！");
            $("#pokemon").attr("src", "asset/img/M-236.png");
        } else if (score <= interval * 6) {
            $("#message").text("你得到名為Vibranium的大岩蛇！");
            $("#pokemon").attr("src", "asset/img/L-95.png");
        } else if (score <= interval * 7) {
            $("#message").text("你得到名為Iron Man的飛天螳螂！");
            $("#pokemon").attr("src", "asset/img/K-123.png");
        } else if (score <= interval * 8) {
            $("#message").text("你得到名為Shadowrun的狃拉！");
            $("#pokemon").attr("src", "asset/img/J-215.png");
        } else if (score <= interval * 9) {
            $("#message").text("你得到名為Mulan的行路草！");
            $("#pokemon").attr("src", "asset/img/I-43.png");
        } else if (score <= interval * 10) {
            $("#message").text("你得到名為Rapunzel的拉魯拉絲！");
            $("#pokemon").attr("src", "asset/img/H-280.png");
        } else if (score <= interval * 11) {
            $("#message").text("你得到名為Snow White的雪童子！");
            $("#pokemon").attr("src", "asset/img/G-361.png");
        } else if (score <= interval * 12) {
            $("#message").text("你得到名為Maleficent的夢妖！");
            $("#pokemon").attr("src", "asset/img/F-200.png");
        } else if (score <= interval * 13) {
            $("#message").text("你得到名為Elsa的三蜜蜂！");
            $("#pokemon").attr("src", "asset/img/E-415.png");
        } else if (score <= interval * 14) {
            $("#message").text("你得到名為Sweet Pea的帕奇利茲！");
            $("#pokemon").attr("src", "asset/img/D-417.png");
        } else if (score <= interval * 15) {
            $("#message").text("你得到名為Ariel的笨笨魚！");
            $("#pokemon").attr("src", "asset/img/C-349.png");
        } else if (score <= interval * 16) {
            $("#message").text("你得到名為Belle的小火馬！");
            $("#pokemon").attr("src", "asset/img/B-77.png");
        } else {
            $("#message").text("你得到名為Giselle的伊貝！");
            $("#pokemon").attr("src", "asset/img/A-133.png");
        }
        $("#message-pokemon").show();
    }
}

function ask() {
    op = opList[Math.floor(Math.random() * opList.length)];
    num1 = Math.floor(Math.random() * (setting[mode][2] - setting[mode][1] + 1) + setting[mode][1]);
    num2 = Math.floor(Math.random() * (setting[mode][2] - setting[mode][1] + 1) + setting[mode][1]);
    switch (op) {
        case "+": ans = num1 + num2; break;
        case "-":
            ans = num1 - num2;
            if (ans < 0) {
                num2 = num1 + num2;
                num1 = num2 - num1;
                num2 = num2 - num1;
                ans = -ans;
            }
            break;
        case "×":
            if (num1 > 11 && num2 > 11) {
                if (Math.random() < 0.5) {
                    num1 = num1 % 10;
                    num1 = (num1 >= setting[mode][1] ? num1 : setting[mode][1]);
                } else {
                    num2 = num2 % 10;
                    num2 = (num2 >= setting[mode][1] ? num2 : setting[mode][1]);
                }
            }
            ans = num1 * num2;
            break;
        case "÷":
            if (num2 > 11) {
                num2 = num2 % 10;
                num2 = (num2 >= setting[mode][1] ? num2 : setting[mode][1]);
            }
            ans = num1 * num2;
            ans = num1 + ans;
            num1 = ans - num1;
            ans = ans - num1;
            break;
    }
    $("#equation").text(num1 + " " + op + " " + num2 + " = ");
}

$(document).ready(function() {
    $(".game-panel").hide();
    $(".option-button").click(function() {
        $(".option-button").removeClass("active");
        $(this).addClass("active");
        mode = Number($(this).attr("id")[4]);
        var tmp = "";
        if (setting[mode][3]) {
            tmp += "加數、";
        }
        if (setting[mode][4]) {
            tmp += "減數、";
        }
        if (setting[mode][5]) {
            tmp += "乘數、";
        }
        if (setting[mode][6]) {
            tmp += "除數、";
        }
        tmp = tmp.slice(0, -1);
        $("#description").html("限時"+setting[mode][0]+"秒，數字範圍由"+setting[mode][1]+"至"+setting[mode][2]+"，包含"+tmp+"。<br>答對得"+setting[mode][7]+"分，答錯扣"+setting[mode][8]+"分。");
    });
    $("#mode0").click();
    $("#answer").bind("enterKey", function(e) {
        if (Number($("#answer").val()) == ans) {
            score += setting[mode][7];
            $("#message").text("答對了："+$("#equation").text()+ans);
            $("#answer").val("");
            ask();
        } else {
            score -= setting[mode][8];;
            $("#message").text("答錯了！");
            $("#answer").val("");
        }
        $("#score").text(score);
    });
    $("#answer").keyup(function(e){
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
    $("#btn-start").click(function() {
        score = 0;
        time = setting[mode][0] * 100;
        $("#score").text(score);
        $("#time").text((time/100).toFixed(2));
        opList = [];
        if (setting[mode][3]) {
            opList.push("+");
        }
        if (setting[mode][4]) {
            opList.push("-");
        }
        if (setting[mode][5]) {
            opList.push("×");
        }
        if (setting[mode][6]) {
            opList.push("÷");
        }
        $(".option").hide();
        $("#btn-start").hide();
        $("#game-title").text("數學遊戲："+$("#mode"+mode).text());
        $("#answer").val("");
        $(".game-panel").show();
        $(".question").show();
        $("#message").text("遊戲開始");
        $("#message-pokemon").hide();
        $("#answer").focus();
        timer = setInterval(countdown, 10);
        ask();
    });
});