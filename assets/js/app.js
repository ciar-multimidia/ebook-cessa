jQuery(document).ready(function($) {
	var btNotas = $('.bt-nota-rodape');
	var notasRodape = $('#notas-de-rodape');

	var notaAtual = 0;

	notasRodape.find('button.fechar').on('click', function(event) {
		notasRodape.removeClass('visivel animation').children('div').removeClass('atual');
		notaAtual = 0;
		btNotas.removeClass('ativo');

		
	});

	btNotas.on('click', function(event) {
		var indexNotaClicada = parseInt($(this).attr('data-nota'));
		var btClicado = $(this);
		var notaClicada = notasRodape.children('div[data-nota]').filter('[data-nota="'+indexNotaClicada+'"]');
		notasRodape.removeClass('visivel animation').children('div').removeClass('atual');
		btNotas.removeClass('ativo');

		if (indexNotaClicada === notaAtual) {
			notaAtual = 0;
		} else{
			notasRodape.addClass('visivel');
			notaClicada.addClass('atual');
			var topNota = btClicado.position().top - notasRodape.height();
			if (topNota < 0) {topNota = 0};
			var leftNota = btClicado.position().left + btClicado.width()/2 - notasRodape.width()/2;
			if (leftNota < 0) {
				leftNota = 0
			} else if (leftNota + notasRodape.width() > $('main').width()) {
				leftNota = $('main').width() - notasRodape.width();
			}
			notasRodape
			.css({
				'top': topNota,
				'left': leftNota
			})
			.addClass('animation');
			btClicado.addClass('ativo');

			notaAtual = indexNotaClicada;
		}
	});



	var $navPaginas = $('#nav-paginas');
	var $paginas = $('span.pagina');

	if ($navPaginas.length > 0) {
		var lastPage = $paginas.length-1;
		var pagAtual = 0;
		var pagsTops = [];

		var updatePagsTops = function(){
			pagsTops = [];
			$paginas.each(function(index, el) {
				pagsTops.push($(el).offset().top);
			});
		}

		updatePagsTops();

		$(window).on('resize', function(event) {
			updatePagsTops();
		});

		setInterval(updatePagsTops, 5000);

		var getCurrentPage = function(){
			var tempPag = 0;
			var currentScroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			$.each(pagsTops, function(index, val) {

				 if (currentScroll > val - windowHeight*0.4) {
				 	tempPag = index;
				 }
			});
			pagAtual = tempPag;
			$navPaginas.find('p').text($paginas.eq(pagAtual).text());
		}

		getCurrentPage();

		$(window).on('scroll', getCurrentPage);

		$navPaginas.find('button').on('click', function(event) {
			var mudaraPagina = false;
			if ($(this).hasClass('prev-pag')) {
				if (pagAtual > 0) {
					mudaraPagina = true;
					pagAtual -= 1;
				}
			}

			else if ($(this).hasClass('next-pag')){
				if (pagAtual < lastPage) {
					mudaraPagina = true;
					pagAtual += 1;
				}
			}

			if (mudaraPagina) {
				$('html').scrollTop(pagsTops[pagAtual]);
				getCurrentPage();
			}
		});
	}




	var $subtitulosCapitulo = $('main article').find('h2, h3');

	$subtitulosCapitulo.each(function(index, el) {
		if ($(el).attr('id')) {
			var ancoraSubcap = $('<a>#</a>').attr('href', '#'+$(el).attr('id'));
			$(el).append(ancoraSubcap);
		}

		else{
			// console.log($(el).text() + ' não tem id')
		}
	});




	var $btSumario = $('footer .capitulos .bt-sumario');
	var $listaSumario = $('footer .capitulos ul.sumario-capitulo');

	$btSumario.on('click', function(event) {
		$(this).toggleClass('ativo');
		$listaSumario.toggleClass('ativo');
		event.stopPropagation();
		
	});

	$listaSumario.on('click', function(event) {
		event.stopPropagation();
	});

	$('body').on('click', function(event) {
		if ($btSumario.hasClass('ativo')) {
			$btSumario.toggleClass('ativo');
			$listaSumario.toggleClass('ativo');
		}
	});
});





