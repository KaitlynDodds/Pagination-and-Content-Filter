
// max number of students to be displayed at any time
const MAX_STUDENTS_SHOWN = 10;

// contains all student list elements
const allStudentListLIs = $('.student-list li');

// current relative student list elements (starts with all list elements)
let activeStudentList = $('.student-list li');

// on page load
$(document).ready(function() {

	// hide all student lis
	hideAll();

	// add search form 
	addSearchForm();

	// add pagination div 
	addPaginationDiv();

	// supply links for pagination div
	addPaginationLinks();

	// show initial 10 students 
	triggerPagination();

});


// HELPER FUNCTIONS ////////////////////////////////////////////////////

// returns array of students between start, end indices of active student list elements 
const getStudents = (start, end) => {
	return activeStudentList.slice(start, end);
}

// calculates how many links will be needed based on current active student list elements 
const calcPaginationLinks = () => {
	return Math.ceil(activeStudentList.length / MAX_STUDENTS_SHOWN);	
}

// if pagination links exist, trigger click event on first link
const triggerPagination = () => {
	if ($('.pagination a')[0]) {
		$('.pagination a')[0].click();
	} else {
		// else, show all active students
		show(activeStudentList);
	}
}


// EVENT HANDlER FUNCTIONS ////////////////////////////////////////////

// filter student lis when pagination link is clicked 
const handlePaginationLink = (e) => {
	if (e.target.nodeName === 'A') {
		// remove active class from other links
		$('.pagination a').removeClass('active')

		// add active class to selected link
		$(e.target).addClass('active');

		// get link num 
		const linkNum = $(e.target).text();

		// calculate which student segment should be shown 
		const start = MAX_STUDENTS_SHOWN * (linkNum - 1);
		const end = start + MAX_STUDENTS_SHOWN;

		// get students to be shown
		const students = getStudents(start, end);

		// display appropriate students 
		show(students);

	}
}

// handle student search input
const handleStudentSearch = (e) => {

	// get input 
	const searchInput = $('.student-search input').val().trim().toLowerCase();

	// filter student lis for matching data 
	activeStudentList = allStudentListLIs.filter(function(index, element) {
		
		const name = $(".student-details h3", element).text();
		const email = $(".email", element).text();

		// check for matching email, name 
		return name.indexOf(searchInput) > -1 || email.indexOf(searchInput) > -1;
	});

	updateUIAfterSearch(searchInput);

}


// UI FUNCTIONS ///////////////////////////////////////////////////////

// hides all student lis
const hideAll = () => {
	// hide all students
	$(allStudentListLIs).hide();
}

// shows designated student lis
const show = (students) => {
	hideAll();

	$(students).show();
}

// add pagination div after student-list ul
const addPaginationDiv = () => {
	 
	// create pagination div and ul, add after student-list ul
	const paginationDiv = $('<div class="pagination"><ul></ul></div>');
	$('.student-list').after(paginationDiv);

	// add event handler to pagination 
	$('.pagination').on('click', handlePaginationLink);

}

// add appropriate num of pagination links 
const addPaginationLinks = () => {

	// determine how many links are needed
	const numLinks = calcPaginationLinks();

	// clear any pagination links 
	$('.pagination ul').empty();

	if (numLinks > 1) {
		// add to html
		let count = 1;
		while (count <= numLinks) {
			// add link to ul 
			const li = `<li><a href="#">${count}</a></li>`;
			$('.pagination ul').append(li);
			count++;
		}
	}

}

// add search form ui to html
const addSearchForm = () => {

	const studentSearchForm = $('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
	$('.page-header').append(studentSearchForm);

	// add event handler for search btn 
	$('.student-search button').on('click', handleStudentSearch);

}

// handle updates to the ui after search has run
const updateUIAfterSearch = (searchInput) => {
	
	// update pagination links
	addPaginationLinks();

	// remove any previously displayed msgs
	$('.student-list p').remove()
		
	if (activeStudentList.length === 0) {
		// display 'no data found' message 
		displayNoDataMsg(searchInput);
	} else {
		// show first 10 students 
		triggerPagination();
	}
}

// show msg indicating no search results
const displayNoDataMsg = (searchInput) => {
	// hide all students
	hideAll();
	// show no results msg
	$('.student-list').prepend(`<p>'${searchInput}' did not return any matching results...</p>`);
}

































