$(document).ready(function(){

	initDates();

	//$("#today").text(constructDate(0));

});

/* Helper function for getting the dates and construct to the mm/dd/yyyy structure
   Input: an integer i days
   Output: the mm/dd/yyyy string after i days of current day
*/

function constructDate(days){
	var date = new Date();
	date.setDate(date.getDate() + days);
	console.log(date.getDate());
	return (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
}

/* Initialize the today's date and the following 4days */
function initDates(){
	/*Have 5 days*/
	for(i = 0; i < 5;i++){
		if(i == 0)
			$("#today").text(constructDate(i));
		else
			$("#future tr:first-child th:nth-child("+ (i) + ")").text(constructDate(i));
	}
}
