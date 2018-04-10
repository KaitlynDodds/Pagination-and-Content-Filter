
const MAX_STUDENTS_SHOWN = 10;

const studentList = $('.student-list');
const studentListLIs = $('.student-list li');


// HELPER FUNCTIONS ////////////////////////////////////////////////////

// returns array of students between start, end indices 
const getStudents = (start, end) => {
	return studentListLIs.slice(start, end);
}

// filter student lis when pagination link is clicked 
const handlePaginationLink = (e) => {
	if (e.target.nodeName === 'A') {
		// remove active class from other links
		$('.pagination a').removeClass('active')

		// add active class to selected link
		$(e.target).addClass('active');

		// hide all students
		hideAll();

		// get link num 
		const linkNum = $(e.target).text();

		// calculate which student segment should be shown 
		const start = MAX_STUDENTS_SHOWN * (linkNum - 1);
		const end = start + MAX_STUDENTS_SHOWN;
		const students = getStudents(start, end);

		// display appropriate students 
		show(students);

	}
}

// UI FUNCTIONS ///////////////////////////////////////////////////////

// hides all student lis
const hideAll = () => {
	// hide all students
	$(studentListLIs).hide();
}

const showAll = () => {
	// hide all students
	$(studentListLIs).show();
}

// shows designated student lis
const show = (studentLIs) => {
	$(studentLIs).show();
}

// add pagination div after student-list ul
const addPaginationDiv = () => {
	 
	// create pagination div and ul, add after student-list ul
	const paginationDiv = $('<div class="pagination"><ul></ul></div>');
	$(studentList).after(paginationDiv);

	// add event handler to pagination 
	$('.pagination').on('click', handlePaginationLink);

	// supply links for pagination div
	addPaginationLinks();

}

// add appropriate num of pagination links 
const addPaginationLinks = () => {

	// calc how many links are needed 
	const numLinks = Math.ceil(studentListLIs.length / MAX_STUDENTS_SHOWN);

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

// on page load
$(document).ready(function() {

	// hide all student lis
	hideAll();

	// add pagination links 
	addPaginationDiv();

	// show initial 10 students 
	if ($('.pagination a')[0]) {
		$('.pagination a')[0].click();
	} else {
		showAll();
	}

});