repo.weeklyInfo.then(function(weeklyInfo){
	var weeks = weeklyInfo.length;
	var tabs = '<!--Start of week tabs--><div class="wrapper">'
	tabs+='<ul class="tabs clearfix" data-tabgroup="first-tab-group">'
	tabs+='<li><a href="#tab0" class="active">All weeks</a></li>'
	for (var w = 1; w <= weeks; w++){
		tabs+='<li><a href="#tab'+w+'">Week '+w+'</a></li>'
	}
	tabs+='</ul><hr>'
	tabs+='<section id="first-tab-group" class="tabgroup">'
	tabs+='<div id="tab0"></div>'
	for (var w = 1; w <= weeks; w++){
		tabs+='<div id="tab'+w+'"></div>'
	}
	tabs+='</section>'
	tabs+='</div><!--End of week tabs-->'
	document.getElementById('report_tab').innerHTML += tabs;
	changeTabs()
});


function changeTabs(){
	$('.tabgroup > div').hide();
	$('.tabgroup > div:first-of-type').show();
	$('.tabs a').click(function(e){
	  	e.preventDefault();
	  	var $this = $(this),
	  	tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
	  	others = $this.closest('li').siblings().children('a'),
	  	target = $this.attr('href');
	  	others.removeClass('active');
	  	$this.addClass('active');
	  	$(tabgroup).children('div').hide();
	  	$(target).show();
	})
}
