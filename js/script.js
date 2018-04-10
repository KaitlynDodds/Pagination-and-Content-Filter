
const MAX_STUDENTS_SHOWN = 10;

const studentList = $('.student-list');
const allStudentListLIs = $('.student-list li');
let activeStudentList = $('.student-list li');


// HELPER FUNCTIONS ////////////////////////////////////////////////////

// returns array of students between start, end indices 
const getStudents = (start, end) => {
	return activeStudentList.slice(start, end);
}

const calcPaginationLinks = (studentList) => {
	return Math.ceil(studentList.length / MAX_STUDENTS_SHOWN);	
}


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

const handleStudentSearch = (e) => {

	// get input 
	const searchInput = $('.student-search input').val().trim().toLowerCase();

	// filter student lis for matching data 
	const filteredStudents = allStudentListLIs.filter(function(index, element) {
		
		const name = $(".student-details h3", element).text();
		const email = $(".email", element).text();

		// check for matching email, name 
		return name.indexOf(searchInput) > -1 || email.indexOf(searchInput) > -1;
	});

	// alter pagination links
	const numLinks = calcPaginationLinks(filteredStudents);
	
	// update pagination links
	addPaginationLinks(numLinks);

	// remove any previously displayed msgs
	$('.student-list p').remove()
		
	if (filteredStudents.length > 0) {
		// update student list to pull from 
		activeStudentList = filteredStudents;

		// show first 10 students 
		triggerPagination();

	} else {
		// display 'no data found' message 
		displayNoDataMsg(searchInput);
	}

}

const triggerPagination = () => {
	if ($('.pagination a')[0]) {
		$('.pagination a')[0].click();
	} else {
		show(activeStudentList);
	}
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

// show msg indicating no search results
const displayNoDataMsg = (searchInput) => {
	// hide all students
	hideAll();
	// show no results msg
	$('.student-list').prepend(`<p>'${searchInput}' did not return any matching results...</p>`);
}

// add pagination div after student-list ul
const addPaginationDiv = () => {
	 
	// create pagination div and ul, add after student-list ul
	const paginationDiv = $('<div class="pagination"><ul></ul></div>');
	$(studentList).after(paginationDiv);

	// add event handler to pagination 
	$('.pagination').on('click', handlePaginationLink);

	// calc how many links are needed 
	const numLinks = calcPaginationLinks(activeStudentList);

	// supply links for pagination div
	addPaginationLinks(numLinks);

}

// add appropriate num of pagination links 
const addPaginationLinks = (numLinks) => {

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


const addSearchForm = () => {

	const studentSearchForm = $('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
	$('.page-header').append(studentSearchForm);

	// add event handler for search btn 
	$('.student-search button').on('click', handleStudentSearch);

}

// on page load
$(document).ready(function() {

	// hide all student lis
	hideAll();

	// add pagination links 
	addPaginationDiv();

	// add search form 
	addSearchForm();

	// show initial 10 students 
	triggerPagination();

});