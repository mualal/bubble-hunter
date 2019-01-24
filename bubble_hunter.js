window.addEventListener("load", main_prog, false); 

	
function main_prog(){ 

	var ctx = game_zone.getContext("2d")
	var w = game_zone.width;
	var h = game_zone.height;
	var l = 11
	var timerId = 0


	click3.onclick = function(){
		l = 15											//уровень сложности: средне
		reset_timer()									//в случае смены уровня сложности, обновляем счётчик
	}


	click4.onclick = function(){
		l = 10											//сложно
		reset_timer()
	}


	click5.onclick = function(){
		l = 5											//очень сложно
		reset_timer()
	}

	
	function circle(ctx, x, y, r) { 					//рисовка окружностей
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();
	}
	

	var es = 0											//чтобы при кратности 4 не увеличивалось при непопадпнии	
	var k = 0											//показатель нажатия
	var s = 400											//очки
	var f = 0											//контроль очков
	var Xx = []											//строка X
	var Yy = []											//строка Y
	var j = 2 											//для непромахов
	var L = 2 											//колличество шариков на поле

	Zz = [0,0]											//для увеличения радиуса
	Rr = [0,0]											//начальное значение радиуса

	for (i = 0; i < 2; i++){ 							//начальные значаения кооридинат шариков - случайное из поля game_zone
		Xx[i] = Math.floor((Math.random()*w))
		Yy[i] = Math.floor((Math.random()*h))	
	}



	function mouse_coords(e){							//функция, чтобы мышкой пользоваться (возвращает координаты нажатия)
		var m = {}
		var rect = game_zone.getBoundingClientRect();
		m.x = e.clientX - rect.left;
		m.y = e.clientY - rect.top;
		return m;
	}


	function calculation() {							//функция, где всё обсчитывается


		game_zone.onmousedown = function(e){			//функция, срабатывающая на нажатие курсором

			es = 1
			var R = mouse_coords(e);

			if(k == 0){
				a = R.x  								//координата по X точки нажатия
				b = R.y 								//координата по Y точки нажатия
				k = 1
			}
			
			for (i = 0; i < L; i++){					//для каждого шарика

				console.log(Xx[i], Yy[i], Rr[i], a, b)

				if (Math.pow(Xx[i] - a, 2) + Math.pow(Yy[i] - b, 2) <= Rr[i] * Rr[i]){
														//проверка на попадание по кружку

					s = s + 300 						//при попаднии увеличиваем очки

					Rr[i] = 0							//обнуляем радиус шарика, по которому попали
					Xx[i] = Math.floor(Math.random() * w)//изменяем координату того шарика по которому попадаем
					Yy[i] = Math.floor(Math.random() * h)//изменяем координату того шарика по которому попадаем
					Zz[i] = 0							

					j--									//попал, зхначит на i меньше
				}
		    }

			if(j == L){
				s = s - 100 							//если не попали, снмаем очки	
			}	    
		}	
	

		game_zone.onmouseup = function(e){				//срабатывает, когда мышка не нажата

			if(k == 1){
				k = 0
			}

			j = L	
		}

		span_score.innerHTML = s						//вывод очков
		if (es == 1 && s > 0 && (f <= s - 1200)){		//каждое 1200 очко увеличиваем количество шариков на 1
			es = 0
			f = s
			L++											//прибавляем шар
			Zz[L - 1] = 0								//задаём значения для нового шарика
			Rr[L - 1] = 0
		}
		
		
		for (i = 0; i < L; i++){						//проверяем степень надутости шарика и в какую сторону он должен увеличиватья

			if (Rr[i] == 0){

				if (k == 0){

					s = s - 200
				}										//отнимаем очки, если пропустили шарик

				Zz[i] = 0		
				Xx[i] = Math.floor(Math.random() * w)
				Yy[i] = Math.floor(Math.random() * h)
			}

			if (Zz[i] == 0){
				Rr[i]++	
			}

			if (Rr[i] == 20){
				Zz[i] = 1
			}

			if (Zz[i] == 1){
				Rr[i]--
			}
		}
	}
		
	
	
	function draw(){									//рисуем кружки

		ctx.clearRect(0, 0, w, h);						 
		ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, w, h)

		for (i = 0; i < L; i++){
			ctx.strokeStyle = "yellow";
			ctx.fillStyle = "yellow";
			circle(ctx, Xx[i], Yy[i], Rr[i])
		}
	}


	function play_func() {								//запуск счётчика
		timerId = setInterval(function() {
			calculation();
			draw();
    	}, 10 * l)
	}


    function reset_timer() {							//останавливаем счётчик и запускаем с другим значением временного промежутка
        if (timerId != 0) {
			clearInterval(timerId)
            timerId = 0
            play_func()
        }
    }


 	click6.onclick = function(){						//кнопка запуска/остановки игры

	 	if (timerId != 0) {
	 		click6.value = "Play"
	     	clearInterval(timerId)
            timerId = 0
	 	} else {
	 		click6.value = "Stop"
	 		play_func()
	 	}
	}
 }

	
	
	
	
	
	


