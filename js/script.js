
const MAX_STUDENTS_SHOWN = 10;

const studentList = $('.student-list');
const studentListLIs = $('.student-list li');

const getStudents = (start, end) => {

	return studentListLIs.slice(start, end);

}

const hideAll = () => {
	// hide all students
	$(studentListLIs).hide();
}

const addPaginationLinks = () => {
	/*
	<div class="pagination">
        <ul>
          <li>
            <a class="active" href="#">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
	*/ 

	const paginationDiv = $('<div class="pagination"><ul></ul></div>');
	$(studentList).after(paginationDiv);

	// calc how many links are needed 
	const numLinks = Math.ceil(studentListLIs.length / MAX_STUDENTS_SHOWN);
	let count = 1;
	while (count <= numLinks) {
		// add link to ul 
		const li = `<li><a href="#">${count}</a></li>`;
		$('.pagination ul').append(li);
		count++;
	}
	
	// add every 10 student to a nested array 
	// getStudents(MAX_STUDENTS_SHOWN * 0, (MAX_STUDENTS_SHOWN * 0) + MAX_STUDENTS_SHOWN

}

$( document ).ready(function() {

	// add pagination links 
	addPaginationLinks();
    
	hideAll();

});