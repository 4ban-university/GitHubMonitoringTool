
repo.weeklyInfo.then(function(weeklyInfo){
	var weeks = weeklyInfo.length;
	var tabs = '<div class="wrapper"><ul class="tabs clearfix" data-tabgroup="first-tab-group">'
	for (var w = 1; w <= weeks; w++){
		if (w == 1){
			tabs+='<li><a href="#tab'+w+'" class="active">Week '+w+'</a></li>'
		}
		else{
			tabs+='<li><a href="#tab'+w+'">Week '+w+'</a></li>'	
		}
	}
	tabs+='</ul><section id="first-tab-group" class="tabgroup">'
	for (var w = 1; w <= weeks; w++){
		tabs+='<div id="tab'+w+'">tab'+w+'</div>'
	}
	tabs+='</section></div>'
	document.getElementById('report_weekly').innerHTML += tabs;
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















