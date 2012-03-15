//= require gko/jquery.elastidegallery 


jQuery(document).ready(function ($) {
	if($('.images:first').length > 0) {
		Gallery.init($('.images:first'));
	}
	$('.carousel').each(function(index) {
		var _self = $(this);
		console.log(_self.find('.item').length);
		if(_self.find('.item').length > 1) {
			_self.carousel();
		}
	});
});