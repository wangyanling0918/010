$(function() {
	var $entry = $.cookie("entry") ? JSON.parse($.cookie("entry")) : [];
	var $entry2 = $.cookie("entry2") ? JSON.parse($.cookie("entry2")) : [];
	var cartName = "noUser";
	if ($entry.length != 0) {
		entry($entry.name);
		cartName = "cart_" + $entry.name
	} else {
		if ($entry2.length != 0) {
			entry($entry2.name);
			cartName = "cart_" + $entry2.name
		}
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
	var goods = JSON.parse($.cookie("cartName"));
	console.log(goods);
	if (goods.length) {
		$(".cart_yes").show();
		$(".cart_no").hide();
		var $table = $(".cart_yes table tbody");
		for (var i = 0; i < goods.length; i++) {
			var $tr = $("<tr/>").appendTo($table);
			var $tdNode1 = $("<td/>").addClass("td1").appendTo($tr);
			$("<span>√</span>").addClass("check").appendTo($tdNode1);
			$("<img/>").attr({
				"src": goods[i].img,
				"id": goods[i].id
			}).css("cursor", "pointer").appendTo($tdNode1);
			var $tdNode2 = $("<td/>").addClass("td1").appendTo($tr);
			var $aNode = $("<a/>").attr("href", "detail.html?" + goods[i].id).appendTo($tdNode2);
			$("<h5/>").html(goods[i].name).appendTo($aNode);
			$("<span/>").html("产品编号：" + goods[i].id).appendTo($tdNode2);
			$("<td/>").html("¥" + goods[i].price).addClass("td2").addClass("cart_price").appendTo($tr);
			var $tdNode3 = $("<td/>").addClass("td2").addClass("num").appendTo($tr);
			$("<div>-</div>").addClass("minus").appendTo($tdNode3);
			$("<input type='text' />").attr("readonly", "readonly").val(goods[i].num).appendTo($tdNode3);
			$("<div>+</div>").addClass("plus").appendTo($tdNode3);
			var $tdNode4 = $("<td/>").addClass("td2").appendTo($tr);
			$("<p><a href='#'>加入收藏夹</a></p>").appendTo($tdNode4);
			$("<p><a href='#' class='del'>删除</a></p>").appendTo($tdNode4)
		}
		$(".td1 .check").click(function() {
			if ($(this).hasClass("noCheck")) {
				$(this).removeClass("noCheck");
				money();
				Check()
			} else {
				$(this).addClass("noCheck");
				money();
				Check()
			}
		});
		Check();

		function Check() {
			var $check = $(".td1 .check");
			var flag = true;
			for (var i = 0; i < $check.length; i++) {
				if ($check.eq(i).hasClass("noCheck")) {
					flag = false
				}
			}
			if (flag) {
				$(".settlement_left input").prop("checked", true)
			} else {
				$(".settlement_left input").prop("checked", false)
			}
		}
		$(".settlement_left input").click(function() {
			if ($(this)[0].checked) {
				$(".td1 .check").removeClass("noCheck")
			} else {
				$(".td1 .check").addClass("noCheck")
			}
			money()
		});
		$(".cart_yes .num").find(".minus").click(function() {
			var count = parseInt($(this).parent().find("input").val());
			if (count > 1) {
				var goodsList = JSON.parse($.cookie("cartName"));
				goodsList[$(this).parents("tr").index()].num--;
				$.cookie("cartName", JSON.stringify(goodsList), {
					expires: 7,
					path: "/"
				});
				$(this).parent().find("input").val(--count);
				money()
			} else {
				alert("数量不能小于1")
			}
		});
		$(".cart_yes .num").find(".plus").click(function() {
			var count = parseInt($(this).parent().find("input").val());
			var goodsList = JSON.parse($.cookie("cartName"));
			goodsList[$(this).parents("tr").index()].num++;
			$.cookie("cartName", JSON.stringify(goodsList), {
				expires: 7,
				path: "/"
			});
			$(this).parent().find("input").val(++count);
			money()
		});
		$(".del").click(function() {
			Del($(this).parents("tr"))
		});

		function Del(obj) {
			var goodsList = JSON.parse($.cookie("cartName"));
			goodsList.splice(obj.index(), 1);
			$.cookie("cartName", JSON.stringify(goodsList), {
				expires: 7,
				path: "/"
			});
			obj.remove();
			money();
			if (goodsList.length == 0) {
				$(".cart_no").show();
				$(".cart_yes").hide()
			}
		}
		$(".delGoods").click(function() {
			var $trNode = $(".cart_yes tbody tr");
			for (var i = 0; i < $trNode.length; i++) {
				if (!$trNode.eq(i).find(".check").hasClass("noCheck")) {
					Del($trNode.eq(i))
				}
			}
		});
		$(".delCart").click(function() {
			$.cookie("cartName", "", {
				expires: 0,
				path: "/"
			});
			$(".cart_yes tbody tr").remove();
			$(".cart_no").show();
			$(".cart_yes").hide()
		});
		money();

		function money() {
			var $cart_price = $(".cart_price");
			var jinE = 0;
			for (var i = 0; i < $cart_price.length; i++) {
				if (!$(".td1 .check").eq(i).hasClass("noCheck")) {
					jinE += parseInt($cart_price.eq(i).html().replace("¥", "")) * parseInt($cart_price.eq(i).parent().find(".num input").val())
				}
			}
			$(".jinE").html(jinE.toFixed(2));
			$(".zje").html(jinE.toFixed(2));
			if (jinE == 0) {
				$(".settlement_right input").addClass("noJieSuan")
			} else {
				$(".settlement_right input").removeClass("noJieSuan")
			}
		}
		$(".settlement_right input").click(function() {
			if (!$(this).hasClass("noJieSuan")) {
				alert("应付金额：" + $(".zje").html() + "元")
			}
		})
	} else {
		$(".cart_no").show();
		$(".cart_yes").hide()
	}
});