$("form").attr('autocomplete', 'off');

if( $('.wizard').length ) {
	var minWiz = 500;
	
	if($('.wizard').height() < minWiz){
		$('.wizard').height(minWiz);
		
		var footerHeight = $('.wizard-footer').height();
		var footerTop = $('.wizard-footer').position().top + footerHeight;		
	
		if (footerTop < minWiz) {
			$('.wizard-footer').css('margin-top', 30 + (minWiz - footerTop) + 'px');
		}		
	}
}

if( $('.btn-delete').length ) {
	$('.btn-delete').click(function(e) {
		e.preventDefault();
		if (confirm('Are you sure you want to do this record??')) {
			var url = $(this).attr('href');
			location.href = url;
		}
	});
}