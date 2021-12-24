$(document).ready(function(){
	var users = [],
	shuffled = [],
	loadout = $("#loadout"),
	insert_times = 30,
	duration_time = 10000;
	$("#roll").click(function(){
		users = [];
		// 判斷使用者是否超過兩位
		var lines = $('textarea').val().split('\n');
		if(lines.length < 2){
			$("#msgbox").slideToggle(100);
			setTimeout(function() {
				  $("#msgbox").slideToggle(100);
			}, 3000);
			return false;
		}
		// 開始抽獎
		else{
			// play audio
			var audioRoll = new Audio('./audio/test.mp3');
			audioRoll.play();
			for(var i = 0;i < lines.length;i++){
				if(lines[i].length > 0){
					users.push(lines[i]);
				}
			}
			$("#roll").attr("disabled",true);
			var scrollsize = 0,
			diff = 0;
			$(loadout).html("");
			$("#log").html("");
			loadout.css("left","100%");
			if(users.length < 10){
				insert_times = 20;
				duration_time = 7000;
			}else{
				insert_times = 10;
				duration_time = 7000;
			}
			for(var times = 0; times < insert_times;times++){
				shuffled = users;
				shuffled.shuffle();
				for(var i = 0;i < users.length;i++){
					loadout.append('<td><div class="roller"><div>'+shuffled[i]+'</div></div></td>');
					scrollsize = scrollsize + 192;
				}
			}
			diff = Math.round(scrollsize /2);
			diff = randomEx(diff - 300,diff + 300);
			$( "#loadout" ).animate({
				left: "-="+diff
			},  duration_time, function() {
				$("#roll").attr("disabled",false);
				let count=0;
				$('#loadout').children('td').each(function () {
					var center = window.innerWidth / 2;
					if($(this).offset().left < center && $(this).offset().left + 185 > center){
						var text = $(this).children().text();
						console.log(`${$(this).offset().left} ${$(this).offset().left+185} ${center} ${text}`)
						$("#log").append("恭喜得獎者 🎊<br/> <span class=\"badge\">"+text+"</span>");
						count++
					}
				});
				if(count!=1)
					document.getElementById('log').innerHTML=`請再試一次！`
				else{
					// 抽到得獎者，下放音樂
					audioRoll.pause();
					var audioVictory = new Audio(`./audio/victory${Math.floor(Math.random()*4)+1}.mp3`);
					audioVictory.play();
				}
			});
		}
	});
	Array.prototype.shuffle = function(){
		var counter = this.length, temp, index;
		while (counter > 0) {
			index = (Math.random() * counter--) | 0;
			temp = this[counter];
			this[counter] = this[index];
			this[index] = temp;
		}
	}
	function randomEx(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}
});