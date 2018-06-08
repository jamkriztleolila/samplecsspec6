function next_discussion(){

	var offset = $("#page").data('page')  * 5;
	alert(offset);
	$.post($('#pagination').data('url') + "Concerns/loaddiscussion",
	{
		offset: offset,
		total: $('#chats').data('total'),
	},
	function(data){
		$("#chats").html(data["div"]);
		$('#chats').data('total', data['total']);

		if(offset >= $('#chats').data('total') - 5){
			$('#next-discussion').css("display", "none");
		}

		$("#page").html($("#page").data('page') + 1);
		$('#page').data('page', $("#page").data('page') + 1);

		if($("#page").data('page') > 1){
			$('#prev-discussion').css("display", '');
		}

		moveToDiscussions();
	}, "json");
}

function prev_discussion(){

	var offset = ($("#page").data('page') - 2)* 5;
	$.post($('#pagination').data('url') + "Concerns/loaddiscussion",
	{
		offset: offset,
		total: $('#chats').data('total'),
	},
	function(data){
		$("#chats").html(data["div"]);
		$('#chats').data('total', data['total']);

		if(offset < 5){
			$('#prev-discussion').css("display", "none");
		}

		if($("#page").data('page') > 1){
			$('#next-discussion').css("display", '');
		}

		$("#page").html($("#page").data('page') - 1);
		$('#page').data('page', $("#page").data('page') - 1);

		moveToDiscussions();
	}, "json");
}

function reply(){
	$.post($('#inbox-Reply').data('url') + "Concerns/reply",
		{
			concern: CKEDITOR.instances.reply_message.getData(),
			concernID: $('#reply_message').data('concernid')
		},
		function(data){
			if(data == null){
				var message = "<span class = \"alert\" class = \"pull-left alert\"" +
				"style = \"color: red;margin-top: 2%;background-color:transparent\">" +
				"Database Error Please Report to FEU TECH CSO MIS</span>";
				$("#inbox-status").html(message);
			}
			else if(!data.hasOwnProperty('error_message')){
				newDiscussion(data);
			}
			else{
				var message = "<span class = \"pull-left alert\"" +
				"style = \"color: red;margin-top: 2%;background-color:transparent\">" +
				data['error_message']+ "</span>";
				$("#inbox-status").html(message);
			}
			setTimeout(fadeOutSpan, 12000);
		}, "json");
}

function sendDraft(){
	$.post($('#inbox-Reply').data('url') + "Concerns/reply",
		{
			concern: CKEDITOR.instances.reply_message.getData(),
			concernID: $('#reply_message').data('concernid')
		},
		function(data){
			if(data == null){
				var message = "<span class = \"alert\" class = \"pull-left alert\"" +
				"style = \"color: red;margin-top: 2%;background-color:transparent\">" +
				"Database Error Please Report to FEU TECH CSO MIS</span>";
				$("#inbox-status").html(message);
			}
			else if(!data.hasOwnProperty('error_message')){
				newDiscussion(data);
			}
			else{
				var message = "<span class = \"pull-left alert\"" +
				"style = \"color: red;margin-top: 2%;background-color:transparent\">" +
				data['error_message']+ "</span>";
				$("#inbox-status").html(message);
			}
			setTimeout(fadeOutSpan, 12000);
		}, "json");
}

//SET THE CONCERN FROM PENDING TO REPLY (COUNSELOR SIDE / DIRECTOR SIDE)
function replied(){
	$.post($('#discussion-status-buttons').data('url') + "Concerns/updatediscussionstatus",
	{
		id: $('#reply_message').data('concernid'),
		status: 'replied'
	},
	function(data){
		if(data['concernID'] == $('#reply_message').data('concernid')){
			var notification = "<span class = \"alert\" id = 'alert-status'>" +
			"You have set this Concern (Ref. " + data['concernID'] +") status to Replied.<br></span>";

			$('#replied').addClass('hidden');
			$('#repliedModal').modal('toggle');
			$('#reply').removeClass("hidden");
			$('#settle').removeClass("hidden");

			$("#concern-status").attr('class', 'fa fa-commenting-o');
			$("#concern-status").data('status','Replied');

			newNotification(data['discussionID'], notification);
		}
	}, "json");
}

function settle(){

	$.post($('#discussion-status-buttons').data('url') + "Concerns/updatediscussionstatus",
	{
		id: $('#reply_message').data('concernid'),
		status: 'settle'
	},
	function(data){
		if(data['concernID'] == $('#reply_message').data('concernid')){
			var notification;
			if(data['user'] == 'Student'){
				notification = "<span class = \"alert\" id = 'alert-status'>" +
				"You have agreed set your Concern (Ref. " + data['concernID'] +") status to Settled.<br>" +
				"Have a Great Day!</span>";

				$('#reply').addClass('hidden');
				$('#settle').addClass('hidden');
			}
			else if(data['user'] == 'Counselor'){
				notification = "<span class = \"alert\" id = 'alert-status'>" +
				"You have set this Concern (Ref. " + data['concernID'] +") status to Settled.<br>" +
				"Please wait for the student's response.</span>";

				$('#settle').attr('disabled', 'disabled');

				$("#concern-status").attr('class', 'fa fa-handshake-o');
				$("#concern-status").data('status','Settled');
			}

			clearInterval(refresher);
			refresher = setInterval(refreshDiscussions, 60000);
			$('#settleModal').modal('toggle');
			newNotification(data['discussionID'], notification);
		}
	}, "json");
}

//Set the status of the concern to Close
function closed(){
	var comment;

	if($('#comment').length > 0) comment = CKEDITOR.instances.comment.getData();

	//post operation to php
	$.post($('#discussion-status-buttons').data('url') + "Concerns/updatediscussionstatus",
	{
		id: $('#reply_message').data('concernid'),
		status: 'closed',
		comment: comment
	},
	function(data){

		// if the closing procedure is succesfull
		if(data['concern']['id'] == $('#reply_message').data('concernid')){
			var notification;
			if(data['user'] == 'Director'){
				notification = "<span class = \"alert\" id = 'alert-status'>" +
				"You have set this Concern (Ref. " + data['concern']['id'] +") status to Closed.<br>" +
				"Have a Great Day!</span>";

				$('#closed').attr('data-target', '#commentModal');
				$('#closed').html('<i class="fa fa-lock"></i> Comment');

				if(data['concern']['directorComment'] != null)
					$('#directorComment').html(data['concern']['directorComment']);
				else
					$('#directorComment').html('<p>There is no comment for this counseling.</p>');

				clearInterval(refresher);
				refresher = null;
			}

			$('#closedModal').modal('toggle');
			$("#concern-status").attr('class', 'fa fa-lock');
			$("#concern-status").data('status','Closed');
			newNotification(data['discussionID'], notification);
		}
	}, "json");
}

function newNotification(id, notification){
	$.post($('#inbox-Reply').data('url') + "Concerns/loaddiscussion",
	{
		offset: 0,
		total: $('#chats').data('total'),
		discussionID: id,
	},
	function(data){
		console.log('new notification loaded');

		$("#chats").html(notification + data["div"]);
		$('#chats').data('total', data['total']);

		if($('#pagination').hasClass("hidden") && data['total'] > 5){
			$('#pagination').removeClass("hidden");
		}

		setTimeout(fadeOutSpan, 12000);
		reset_pagination();
		moveToDiscussions();

	}, "json");
}

function newDiscussion(id){

	$.post($('#inbox-Reply').data('url') + "Concerns/loaddiscussion",
	{
		offset: "0",
		total: $('#chats').data('total'),
		discussionID: id
	},
	function(data){
		alert('sent');
		console.log('test' + data);
		var message;

		if($('#chats').data('user') == 'Student'){
			message = "<span class = \"alert\" id = 'alert-status'>" +
			"Reply Sent Successfully.<br>Please wait for the response of your Guidance Counselor.</span>";
		}
		else if($('#chats').data('user') == 'Counselor'){
			message = "<span class = \"alert\" id = 'alert-status'>" +
			"Reply Sent Successfully.</span>";
		}

		$("#chats").html(message + data["div"]);
		$('#chats').data('total', data['total']);

		CKEDITOR.instances.reply_message.setData('');
		if($('#concern-status').data('status') != data['details']['status']){
			$("#concern-status").attr('class', 'fa ' + data['details']['icon']);
			$("#concern-status").data('status', data['details']['status']);
		}

		if($('#pagination').hasClass("hidden") && data['total'] > 5){
			$('#pagination').removeClass("hidden");
		}
		reset_pagination();


		setTimeout(fadeOutSpan, 12000);
		moveToDiscussions();

	}, "json").fail(function(xhr, status, error) {
       console.log('test: ' + status + error + " " + xhr);
       console.log(xhr.responseText);
    });
}

function updateDiscussion(id, key, folder){
	$.post($('#discussion-' + key).data('url') + "Concerns/loaddiscussion",
	{
		offset: 0,
		total: $('#chats').data('total'),
		discussionID: id
	},
	function(data){
		console.log(folder);
		var message;
		if(folder == 'drafts'){
			message = "<span class = \"alert\" id = 'alert-status'>" +
			"Draft is saved Successfully.<br>You are welcome to send it anytime.</span>";
		}
		else{
			message = "<span class = \"alert\" id = 'alert-status'>" +
			"<a href= \"inbox/"+ data['details']['id'] + "/" + id +"\"  style = \"color: green\">" +
			"Discussion is sent Successfully.</a><br>Please wait for the response of your Guidance Counselor.</span>";
			$("#concern-status").attr('class', 'fa ' + data['details']['icon']);
			$("#concern-status").data('status', data['details']['status']);
		}

		$("#chats").html(message + data["div"]);
		$('#chats').data('total', data['total']);

		if(!$('#pagination').hasClass("hidden") && data['total'] <= 5){
			$('#pagination').addClass("hidden");
		}
		reset_pagination();

		setTimeout(fadeOutSpan, 12000);
		moveToDiscussions();
	}, "json");
}

function moveToDiscussions(){
	$('html,body').animate({
		scrollTop: $("#chats").offset().top},
		'slow');
}

function fadeOutSpan(){
	$(".alert").fadeOut("10000", function() {
		$(".alert").remove();
	});
}

function reset_pagination(){
	$('#prev-discussion').css("display", "none");
	$('#next-discussion').css("display", "");
	$('#page').data('page', 1);
	$("#page").html(1);
}

// there will be a refresh while a discussion is open
function refreshDiscussions(){

	$.post($('#inbox-Reply').data('url') + "Concerns/loaddiscussion",
	{
		offset: "0"
	},
	function(data){
		console.log(data);
		console.log('itsworking');
		var message = "";

		if($('#concern-status').data('status') != data['details']['status']){
			// if there is a change of status the status area will be updated

			$("#concern-status").attr('class', 'fa ' + data['details']['icon']);
			$("#concern-status").data('status', data['details']['status']);

			switch(data['details']['status']){
				case 'Replied':{
					//FROM PENDING TO REPLIED (STUDENT SIDE)
					if($('#chats').data('user') == 'Student'){
						message = "<span class = \"alert\" id = 'alert-status'>" +
						"A counselor will now accommodate your concern.</span>";
						$('#reply').removeClass("hidden");

						clearInterval(refresher);
						refresher = setInterval(refreshDiscussions, 20000);
					}
					break;
				}
				case 'Settled':{
					//FROM REPLIED TO SETTLED (STUDENT SIDE)
					if($('#chats').data('user') == 'Student'){
						message = "<span class = \"alert\" id = 'alert-status'>" +
						"If you have no additional concern for this counseling please click the Settle button below.<br />" +
						"Thank you!</span>";

						$('#settle').removeClass('hidden');

						clearInterval(refresher);
						refresher = setInterval(refreshDiscussions, 60000);
					}
					break;
				}
				case 'Closed':{
					//FROM SETTLED TO CLOSED (closedDate == NULL)
					if(data['details']['closedDate'] == null){
						if($('#chats').data('user') == 'Student'){
							message = "<span class = \"alert\" id = 'alert-status'>" +
							"Your concern is currently being reviewed by the GU director.<br />" +
							"Have a nice day!</span>";

							clearInterval(refresher);
							refresher = setInterval(refreshDiscussions, 60000);
						}
						else if($('#chats').data('user') == 'Director'){
							message = "<span class = \"alert\" id = 'alert-status'>" +
							"Your approval is needed to close this concern." +
							"<br />You may review this concern and then comment by clicking the close button below.<br />" +
							"This will also formally close this concern.</span>";

							$('#closed').removeClass('hidden');
							clearInterval(refresher);
							refresher = null;
						}
					}
					else{
						if($('#chats').data('user') ==  'Student'){
							message = "<span class = \"alert\" id = 'alert-status'>" +
							"Your concern is now closed.<br />" +
							"You can check if the GU Director has a comment regarding your concern by clicking the comment button below.</span>";

							$('#closed').removeClass('hidden');
							$('#closed').html('<i class="fa fa-lock"></i> Comment');

							if(data['details']['directorComment'] != null)
								$('#directorComment').html(data['details']['directorComment']);
							else
								$('#directorComment').html('<p>There is no comment for this counseling.</p>');

							clearInterval(refresher);
							refresher = null;
						}
					}
					break;
				}
			}

			$("#chats").html(message + data["div"]);
			$('#chats').data('total', data['total']);
			moveToDiscussions();
		}
		else if(data['details']['status'] == 'Replied' && $('#chats').data('total') < data['total']) {
			//if there is a reply (STUDENT AND COUNSELOR / DIRECTOR SIDE)
			message = "<span class = \"alert\" id = 'alert-status'>" +
			"There is a reply!</span>";

			$("#chats").html(message + data["div"]);
			$('#chats').data('total', data['total']);

			moveToDiscussions();
		}
		else if(data['details']['status'] == 'Settled' && data['details']['settledDate'] != null && !$('#reply').hasClass("hidden")){

			// applicable if the student agree on moving the concern from replied to settled

			if($('#chats').data('user') == 'Counselor') { // (COUNSELOR SIDE)
				message = "<span class = \"alert\" id = 'alert-status'>" +
					"This concern is now settled." +
					"<br />Click the close button below to notify your Director and to officially close this concern.<br />" +
					"You did a Great Job!</span>";
			}
			else if($('#chats').data('user') == 'Director') { // (DIRECTOR SIDE)
				message = "<span class = \"alert\" id = 'alert-status'>" +
					"This concern is now settled." +
					"<br />You may review this concern and then comment by clicking the close button below.<br />" +
					"This will also formally close this concern.</span>";
			}

			$("#chats").html(message + data["div"]);
			$('#chats').data('total', data['total']);
			$('#reply').addClass('hidden');
			$('#settle').addClass('hidden');
			$('#closed').removeClass('hidden');

			moveToDiscussions();
			clearInterval(refresher);
			refresher = setInterval(refreshDiscussions, 60000);
		}
		else if(data['details']['status'] == 'Closed' && data['details']['closedDate'] != null ){

			// applicable if the Director officially close the concern

			if($('#chats').data('user') == 'Counselor') { // (COUNSELOR SIDE)
				message = "<span class = \"alert\" id = 'alert-status'>" +
					"This concern has been reviewed and tagged as closed by your Director." +
					"<br />You can check if the Director has a comment regarding this concern by clicking the comment button below.<br />" +
					"You did a Great Job!</span>";

				$('#closed').removeAttr('disabled');
				$('#closed').attr('data-toggle', 'modal');
				$('#closed').attr('data-target', '#setCommentModal');
				$('#closed').html('<i class="fa fa-lock"></i> Comment');
			}
			else if($('#chats').data('user') == 'Student') { // (STUDENT SIDE)
				message = "<span class = \"alert\" id = 'alert-status'>" +
					"Your concern is now closed.<br />" +
					"You can check if the Director has a comment regarding your concern by clicking the comment button below.</span>";

				$('#closed').removeClass('hidden');
				$('#closed').html('<i class="fa fa-lock"></i> Comment');
			}

			$("#chats").html(message + data["div"]);
			$('#chats').data('total', data['total']);

			if(data['details']['directorComment'] != null)
				$('#directorComment').html(data['details']['directorComment']);
			else
				$('#directorComment').html('<p>There is no comment for this counseling.</p>');

			moveToDiscussions();
			clearInterval(refresher);
			refresher = null;
		}
		else{
			$("#chats").html(data["div"]);
		}

		if($('#pagination').hasClass("hidden") && data['total'] > 5){
			$('#pagination').removeClass("hidden");
		}

		reset_pagination();
		setTimeout(fadeOutSpan, 15000);

	}, "json");
}
