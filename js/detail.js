$(function() {
	$(".site").hover(function() {
		$(".siteList").show()
	}, function() {
		$(".siteList").hide()
	});
	$(".siteList a").each(function() {
		$(this).hover(function() {
			$(this).addClass("abj").parent().siblings().children().removeClass("abj")
		});
		$(this).click(function() {
			$(this).addClass("beiJing").parent().siblings().children().removeClass("beiJing");
			$(".bj").html($(this).html())
		})
	});
	$(".myimg").hover(function() {
		$(this).children(".cover").show();
		$(this).next(".bg_box").show()
	}, function() {
		$(this).children(".cover").hide();
		$(this).next(".bg_box").hide()
	});
	var imgWidth = $(".myimg").width();
	var imgHeight = $(".myimg").height();
	var coverWidth = $(".cover").width();
	var coverHeight = $(".cover").height();
	var img_left = $(".myimg").offset().left;
	var img_top = $(".myimg").offset().top;
	$(".myimg").mousemove(function(e) {
		var mos_left = e.pageX;
		var mos_top = e.pageY;
		var left = mos_left - img_left - (coverWidth / 2);
		var top = mos_top - img_top - (coverHeight / 2);
		if (left < 0) {
			left = 0
		}
		if (left > imgWidth - coverWidth) {
			left = imgWidth - coverWidth
		}
		if (top < 0) {
			top = 0
		}
		if (top > imgHeight - coverHeight) {
			top = imgHeight - coverHeight
		}
		$(this).children(".cover").css({
			"left": left + "px",
			"top": top  + "px"
		});
		var bg_img_left = -2 * left;
		var bg_img_top = -2 * top;
		$(this).next(".bg_box").children(".bgbox_img").css({
			"left": bg_img_left + "px",
			"top": bg_img_top + "px"
		})
	})
});
$(function() {
	var $entry = $.cookie("entry") ? JSON.parse($.cookie("entry")) : [];
	var $entry2 = $.cookie("entry2") ? JSON.parse($.cookie("entry2")) : [];
	if ($entry.length != 0) {
		entry($entry.name);
		var cartName = "cart_" + $entry.name;
		cartNum(cartName);
		console.log(1)
	} else {
		if ($entry2.length != 0) {
			entry($entry2.name);
			var cartName = "cart_" + $entry2.name;
			cartNum(cartName)
		}
	}
	cartNum();

	function cartNum() {
		var goodsList = $.cookie("cartName") ? JSON.parse($.cookie("cartName")) : [];
		for (var i = 0; i < goodsList.length; i++) {
			var Number = goodsList[i].num
		}
		$("#logo_right span").first().html(Number)
	}

	function entry(name) {
		$("#top_center a").hide();
		var $spanNode1 = $("<span/>").html("您好，" + name).appendTo($("#top_center"));
		var $spanNode2 = $("<span/>").css({
			"cursor": "pointer",
			"margin-left": "5px"
		}).html("[退出]").appendTo($("#top_center"));
		$spanNode2.hover(function() {
			$(this).css("text-decoration", "underline")
		}, function() {
			$(this).css("text-decoration", "none")
		});
		$spanNode2.click(function() {
			$.cookie("entry2", "", {
				expires: 0,
				path: "/"
			});
			$.cookie("entry", "", {
				expires: 0,
				path: "/"
			});
			history.go(0)
		})
	}
	$("#logo_right").click(function() {
		window.location.href = "shopCart.html"
	})
});

$(function() {
	var $number = $(".number");
	var $count = parseInt($number.find("input").val());
	if ($count == 1) {
		$number.find(".minus").css("color", "#BEBEBE")
	}
	$number.find(".minus").click(function() {
		$count = parseInt($number.find("input").val());
		if ($count == 1) {
			$(this).css("color", "#BEBEBE")
		} else {
			$(this).css("color", "#555555");
			$number.find("input").val(--$count);
			$count = parseInt($number.find("input").val());
			if ($count == 1) {
				$(this).css("color", "#BEBEBE")
			}
		}
	});
	$number.find(".plus").click(function() {
		$count = parseInt($number.find("input").val());
		$number.find("input").val(++$count);
		$number.find(".minus").css("color", "#555555")
	});
	$number.find("input").blur(function() {
		if ($(this).val() <= 0) {
			alert("数量不能小于1");
			$(this).val(1)
		} else {
			$(this).val(parseInt($(this).val()))
		}
	});
	
	$(".goodsAdd").click(function() {
		var a= 0;
		a++;
		var index = parseInt( $('#logo_right .red').text()); 
		console.log(index)
		a+=index;
		$("#logo_right span").first().html(a);
		var goodsId = $(".num em").text();
		var goodsImg = $(".bg_box img").attr("src");
		var goodsName = $(".name").text();
		var goodsPrice = $("#shopprice").text();
		var goodsNum =a;
		var goodsList = [];
		var goods = {
			id: goodsId,
			img: goodsImg,
			name: goodsName,
			price: goodsPrice,
			num: goodsNum
		};
		goodsList.unshift(goods);
		$.cookie("cartName", JSON.stringify(goodsList), {
			expires: 7,
			path: "/"
		})
		
	})
});
