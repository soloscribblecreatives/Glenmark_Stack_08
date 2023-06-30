
var arrSurveyQuestions = {
   2: "How often do you embrace a moment for yourself?",
   3: "How would you rate the overall experience of adding breath awareness in your daily life?",
   4: "How likely are you to continue the practice of breath awareness in your daily routine?"
};


/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//alert("+++++currentContentId+++++++"+currentContentId+"+++++++contentName+++++++"+contentName);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		//step 2:

		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}

checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		//step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});




});




//step 6:-
function toCaptureTime(page_id){
	var currentSlideNo = page_id;
	var startTime = Date.now();
	
	//alert("===currentSlideNo===="+currentSlideNo);
	//alert("===startTime===="+startTime);
	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	if(temp == null){
		if (currentSlideNo!=0){
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else{
	var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	var newTime = Date.now();
	var newSlideTime = (newTime - existingTime);
	var endTimeInDBFormat = currentTimeInDatabaseFormat();
    var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		//alert("===newSlideTime===="+newSlideTime);
	//alert("===EndTimeNext===="+EndTimeNext);
    console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
   
   if(EndTimeNext == null){
	localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
	localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
	}

    if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){
	var nextSlideNo = currentSlideNo;

    }else{
	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
 
	if(nextSlideNo <= 5){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}

}
//step ends..


function go_nav(direction) {
	
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&   localStorage.getItem("currentcustomslideflag") =='true'){

	var custcomslideid=parseInt(localStorage.getItem("currentcontentcustomslideId"));

		var page_id =  custcomslideid;
		}else{
			
				var page_id =  parseInt($("#wrapper").attr("rel"));
		}	
		
	console.log("swipeleft"+localStorage.getItem("currentslide"));
	localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
	//step 7 ends here
//localStorage.setItem(contentName+"_slideNo_"+currentSlideNo ,n);
var flag=0;


if(direction == 'b') {

	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&    localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


	}
			else{
			if(page_id >= 0){
				page_id = page_id - 1;
				if(page_id == 0){
					flag=2;
				}
			}

	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
    }

	}
}else {
	
//custom slide changes continues here....

	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' && localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev

		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
	}
	
		else{
		if(page_id <= 5){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 6){
            flag=1;
        }
	}	
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
    }

}
}


//step 8:
currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
//step 8 ends here
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",page_id);

$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){

	if (typeof(localStorage.getItem("previousslide"))!='undefined'){
		//to checked previous slide has god end time...
		var previousslideid=localStorage.getItem("previousslide");
		toCaptureTime(previousslideid);
		
	}
	toCaptureTime(pg_id);


	//step 9 ends here..
//alert("++++++++++set_pg_content++++++++++"+pg_id);
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide1/1.jpg" width="1024" height="768" alt=""></div>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide2/1.jpg" width="1024" height="768" alt=""></div><div class="bullet1"><img src="slide2/1.png"></div><div class="bullet2"><img src="slide2/2.png"></div><div class="bullet3"><img src="slide2/3.png"></div><div class="bullet4"><img src="slide2/4.png"></div><div class="bullet5"><img src="slide2/5.png"></div>';
	break;
	case 3:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide3/1.jpg" width="1024" height="768" alt=""></div><div class="bullet1"><img src="slide2/1.png"></div><div class="bullet2"><img src="slide2/2.png"></div><div class="bullet3"><img src="slide2/3.png"></div><div class="bullet4"><img src="slide2/4.png"></div><div class="bullet5"><img src="slide2/5.png"></div>';
	break;
    case 4:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide4/1.jpg" width="1024" height="768" alt=""></div><div class="bullet1"><img src="slide2/1.png"></div><div class="bullet2"><img src="slide2/2.png"></div><div class="bullet3"><img src="slide2/3.png"></div><div class="bullet4"><img src="slide2/4.png"></div><div class="bullet5"><img src="slide2/5.png"></div>';
	break;
	case 5:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide5/1.jpg" width="1024" height="768" alt=""></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}


function open_page(url,page_id){
	
	
	    count3=2;
    count4=0;
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);
		
	}

	

	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here

	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
	 }
	  checkClickThrough();
	}

	var count3=2,count4=0;

function open_page2(url,page_id,count){
    count1=0;
    count3=page_id+count-2;
    count4=page_id+1;
	 // alert(page_id);
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);
	}
    count2=page_id;
    count1=page_id+count-1;

	localStorage.setItem("currentslide",page_id);
	currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	localStorage.setItem("current",currentContentNSlide);

	$("#wrapper").attr("rel",page_id);
	var content="";
	var pg_content = set_pg_content(page_id);
	$("#main_content").html(pg_content);
	checkClickThrough();
}
	
	
	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

		if(currentslide == 2){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons"><div class="slide01_home_btn_mask" onclick="checkBtns(3)"></div>\
			<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="1"/><div class="control_indicator"id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="2"/><div class="control_indicator"id="radio02" onclick="select2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_03" name="checkB01" value="3"/><div class="control_indicator"id="radio03" onclick="select3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_04" name="checkB01" value="4"/><div class="control_indicator"id="radio04" onclick="select4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_05" name="checkB01" value="5"/><div class="control_indicator"id="radio05" onclick="select5()"></div></label>\
			</div>\
			<div class="submit_button" onclick="savedata(1,1,2);endTime1(2);hidesubmitonclick();checkBtns(1);"></div></div></div>';  
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();
				$(".submit_button,.slide01_next").fadeIn();		
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	
	
	
	if(currentslide == 3){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons"><div class="slide01_home_btn_mask" onclick="checkBtns(3)"></div>\
			<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="1"/><div class="control_indicator"id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="2"/><div class="control_indicator"id="radio02" onclick="select2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_03" name="checkB01" value="3"/><div class="control_indicator"id="radio03" onclick="select3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_04" name="checkB01" value="4"/><div class="control_indicator"id="radio04" onclick="select4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_05" name="checkB01" value="5"/><div class="control_indicator"id="radio05" onclick="select5()"></div></label>\
			</div>\
			<div class="submit_button" onclick="savedata(1,1,3);endTime1(3);hidesubmitonclick();checkBtns(2);"></div></div></div>';  
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();
				$(".submit_button,.slide01_next").fadeIn();		
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	
	
	
	if(currentslide == 4){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons"><div class="slide01_home_btn_mask" onclick="checkBtns(3)"></div>\
			<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="1"/><div class="control_indicator"id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="2"/><div class="control_indicator"id="radio02" onclick="select2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_03" name="checkB01" value="3"/><div class="control_indicator"id="radio03" onclick="select3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_04" name="checkB01" value="4"/><div class="control_indicator"id="radio04" onclick="select4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_05" name="checkB01" value="5"/><div class="control_indicator"id="radio05" onclick="select5()"></div></label>\
			</div>\
			<div class="submit_button" onclick="savedata(1,1,4);endTime1(4);hidesubmitonclick();checkBtns(3);"></div></div></div>';  
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();
				$(".submit_button,.slide01_next").fadeIn();		
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
}


function checkBtns(refNum){
	switch(refNum){
		case 1:
		open_page('',3);
		break;
		case 2:
		open_page('',4);
		break;
		case 3:
		open_page('',5);
		break;
	}
}
	
	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


function savedata(answer,type,questionNumber){
 	if(questionNumber == 2){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 3){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 4){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	var question = arrSurveyQuestions[questionNumber];
	localStorage.setItem("surveyQuestion_"+currentContentId+"_"+contentName+"_"+questionNumber,question);
	localStorage.setItem("surveyAnswer_"+currentContentId+"_"+contentName+"_"+questionNumber,varanswer);
	//toCaptureTime(2);
    //document.getElementById('edit-count-checked-checkboxes').value=count;
}



function closewindowslide(currentslide)
{
	toCaptureTime(currentslide);
}
function endTime1(currentSlideNo){
		var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
		var newTime = Date.now();
		var newSlideTime = (newTime - existingTime);
		localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
		var endTimeInDBFormat = currentTimeInDatabaseFormat();
		localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);

}
function hidesubmitonclick()
{
	$('.submit_button').css("display","none");
	$('.control_indicator').css("display","none");
}


function select1()
{
	$('.bullet1').css("scale","0.8");
	$('.bullet2').css("scale","1.0");
	$('.bullet3').css("scale","1.0");
	$('.bullet4').css("scale","1.0");
	$('.bullet5').css("scale","1.0");
}

function select2()
{
	$('.bullet1').css("scale","1.0");
	$('.bullet2').css("scale","0.8");
	$('.bullet3').css("scale","1.0");
	$('.bullet4').css("scale","1.0");
	$('.bullet5').css("scale","1.0");
}

function select3()
{
	$('.bullet1').css("scale","1.0");
	$('.bullet2').css("scale","1.0");
	$('.bullet3').css("scale","0.8");
	$('.bullet4').css("scale","1.0");
	$('.bullet5').css("scale","1.0");
}

function select4()
{
	$('.bullet1').css("scale","1.0");
	$('.bullet2').css("scale","1.0");
	$('.bullet3').css("scale","1.0");
	$('.bullet4').css("scale","0.8");
	$('.bullet5').css("scale","1.0");
}

function select5()
{
	$('.bullet1').css("scale","1.0");
	$('.bullet2').css("scale","1.0");
	$('.bullet3').css("scale","1.0");
	$('.bullet4').css("scale","1.0");
	$('.bullet5').css("scale","0.8");
}