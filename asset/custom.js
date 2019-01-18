var timer, time, score, opList, op, num1, num2, ans;

function getBound(b) {
    return Number($("#"+b+"-bound").val());
}

function setBound(b, i) {
    $("#"+b+"-bound").val(Number(i));
}

function validate() {
    if (!$("#allow-negative").hasClass("active")) {
        if (getBound("lower") < 0) {
            setBound("lower", Math.abs(getBound("lower")));
        }
        if (getBound("upper") < 0) {
            setBound("upper", Math.abs(getBound("upper")));
        }
    }
    if (!$("#allow-floating").hasClass("active")) {
        setBound("lower", Math.floor(getBound("lower")));
        setBound("upper", Math.floor(getBound("upper")));
    }
    if (getBound("lower") > getBound("upper")) {
        var tmp = getBound("lower");
        setBound("lower", getBound("upper"));
        setBound("upper", tmp);
    }
    $("#time-limit").val(Math.abs(Math.floor(Number($("#time-limit").val()))));
}

function countdown() {
    if (time > 0) {
        time--;
        $("#time").text((time/100).toFixed(2));
    } else {
        clearInterval(timer);
        $("#message").text("遊戲結束");
        $("#message-pokemon").show();
        if (score < 5) {
            $("#pokemon").attr("src", "asset/img/Q-88.png");
        } else if (score < 10) {
            $("#pokemon").attr("src", "asset/img/P-74.png");
        } else if (score < 15) {
            $("#pokemon").attr("src", "asset/img/O-111.png");
        } else if (score < 20) {
            $("#pokemon").attr("src", "asset/img/N-328.png");
        } else if (score < 25) {
            $("#pokemon").attr("src", "asset/img/M-236.png");
        } else if (score < 30) {
            $("#pokemon").attr("src", "asset/img/L-95.png");
        } else if (score < 35) {
            $("#pokemon").attr("src", "asset/img/K-123.png");
        } else if (score < 40) {
            $("#pokemon").attr("src", "asset/img/J-215.png");
        } else if (score < 45) {
            $("#pokemon").attr("src", "asset/img/I-43.png");
        } else if (score < 50) {
            $("#pokemon").attr("src", "asset/img/H-280.png");
        } else if (score < 55) {
            $("#pokemon").attr("src", "asset/img/G-361.png");
        } else if (score < 60) {
            $("#pokemon").attr("src", "asset/img/F-200.png");
        } else if (score < 65) {
            $("#pokemon").attr("src", "asset/img/E-415.png");
        } else if (score < 70) {
            $("#pokemon").attr("src", "asset/img/D-417.png");
        } else if (score < 75) {
            $("#pokemon").attr("src", "asset/img/C-349.png");
        } else if (score < 80) {
            $("#pokemon").attr("src", "asset/img/B-77.png");
        } else {
            $("#pokemon").attr("src", "asset/img/A-133.png");
        }
    }
}

function ask() {
    var valid;
    do {
        valid = true;
        op = opList[Math.floor(Math.random() * opList.length)];
        num1 = Math.floor(Math.random() * (getBound("upper") - getBound("lower") + 1) + getBound("lower"));
        num2 = Math.floor(Math.random() * (getBound("upper") - getBound("lower") + 1) + getBound("lower"));
        switch (op) {
            case "+": ans = num1 + num2; break;
            case "-": ans = num1 - num2; break;
            case "×": ans = num1 * num2; break;
            case "÷": ans = num1 / num2; break;
        }
        if (ans < 0 && !$("#allow-negative").hasClass("active")) {
            valid = false;
        }
        if (ans != Math.floor(ans) && !$("#allow-floating").hasClass("active")) {
            valid = false;
        }
    } while (!valid);
    $("#equation").text(num1 + " " + op + " " + num2 + " = ");
}

$(document).ready(function() {
    $(".game-panel").hide();
    $(".option-button").click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });
    $("#lower-bound").change(function() {
        validate();
    });
    $("#upper-bound").change(function() {
        validate();
    });
    $("#time-limit").change(function() {
        validate();
    });
    $("#answer").bind("enterKey", function(e){
        if (Number($("#answer").val()) == ans) {
            score += 2;
            $("#message").text("答對了："+$("#equation").text()+ans);
            $("#answer").val("");
            ask();
        } else {
            score--;
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
        validate();
        score = 0;
        time = Number($("#time-limit").val()) * 100;
        $("#score").text(score);
        $("#time").text((time/100).toFixed(2));
        opList = ["+"];
        if ($("#allow-subtraction").hasClass("active")) {
            opList.push("-");
        }
        if ($("#allow-multiplication").hasClass("active")) {
            opList.push("×");
        }
        if ($("#allow-division").hasClass("active")) {
            opList.push("÷");
        }
        $(".option").hide();
        $(".game-panel").show();
        $("#message-pokemon").hide();
        $("#answer").focus();
        timer = setInterval(countdown, 10);
        ask();
    });
});