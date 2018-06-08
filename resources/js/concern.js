function next_concern(folder){
	var program = $('#pagination').data('program');
	var offset = $("#pagination").data('page')  * 10;

	$.post($('#pagination').data('url') + "Concerns/loadconcerns",
	{
		offset: offset,
		total: $('#pagination').data('total'),
		folder: folder,
		program: program
	},
	function(data){
		console.log(data);
		$("#" + folder +"-entries").html(data["div"]);
		$('#pagination').data('total', data['total']);
		$('#pagination').data('page', $("#pagination").data('page') + 1);

		if(offset >= (($('#pagination').data('total') * 10) - 10)){
			$('#next-concern').attr("disabled", "disabled");
		}

		if(data['total'] > 1) $("#concern-page").html($("#pagination").data('page') + " / " + data['total']);
		else $("#concern-page").html(" 1 / 1 ");

		if($("#pagination").data('page') > 1){
			$('#prev-concern').removeAttr("disabled");
		}
	}, "json");
}

function prev_concern(folder){
	var program = $('#pagination').data('program');
	var offset = ($("#pagination").data('page') - 2) * 10;

	$.post($('#pagination').data('url') + "Concerns/loadconcerns",
	{
		offset: offset,
		total: $('#pagination').data('total'),
		folder: folder,
		program: program
	},
	function(data){
		console.log(data);
		$("#" + folder +"-entries").html(data["div"]);
		$('#pagination').data('total', data['total']);

		if(offset < 10){
			$('#prev-concern').attr("disabled", "disabled");
		}

		if(offset <= (($('#pagination').data('total') * 10) - 10)){
			$('#next-concern').removeAttr("disabled");
		}

		$('#pagination').data('page', $("#pagination").data('page') - 1);
		if(data['total'] > 1) $("#concern-page").html($("#pagination").data('page') + " / " + data['total']);
		else $("#concern-page").html($("#pagination").data('page') + " / 1");

	}, "json");
}

function refresh_concern(folder){
	var program = $('#pagination').data('program');

	$.post($('#refresh-' + folder).data('url') + "Concerns/loadconcerns",
	{
		offset: 0,
		total: $('#pagination').data('total'),
		folder: folder,
		program: program
	},
	function(data){
		console.log(data);
		$("#" + folder +"-entries").html(data["div"]);
		$('#pagination').data('total', data['total']);

		$('#prev-concern').attr("disabled", "disabled");

		if(data['total'] > 1) $('#next-concern').removeAttr("disabled");
		else $('#next-concern').attr("disabled", "disabled");

		$('#pagination').data('page', 1);


		if(data['total'] > 1) $("#concern-page").html($("#pagination").data('page') + " / " + data['total']);
		else $("#concern-page").html($("#pagination").data('page') + " / 1");

	}, "json");
}

function inbox(program){
	$.post($('#pagination').data('url') + "Concerns/loadconcerns",
	{
		program: program,
		offset: 0,
		total: $('#pagination').data('total'),
		folder: 'inbox'
	},
	function(data){
		$("#inbox-entries").html(data["div"]);
		$("#inbox-folder").html('Counselings - ' + program);
		$('#pagination').data('total', data['total']);

		$('#prev-concern').attr("disabled", "disabled");

		if(data['total'] > 1) $('#next-concern').removeAttr("disabled");
		else $('#next-concern').attr("disabled", "disabled");

		$('#pagination').data('page', 1);

		if(data['total'] > 1) $("#concern-page").html($("#pagination").data('page') + " / " + data['total']);
		else $("#concern-page").html("1 / 1");

		// change data-program for pagination
		$('#pagination').data('program', program);

		// change status of previous li
		$('#inbox li.active i').removeClass('fa-envelope-open-o');
		$('#inbox li.active i').addClass('fa-envelope-o');
		$('#inbox li.active').removeClass('active');

		// change status of current li
		$('#inbox li#' + program).addClass('active');
		$('#inbox li#' + program + " i").removeClass('fa-envelope-o');
		$('#inbox li#' + program + " i").addClass('fa-envelope-open-o');
	}, "json");
}
