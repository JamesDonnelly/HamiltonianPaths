/* Created by James Donnelly; http://jamesmdonnelly.com
   Feel free to use this. A hosted version is available
   at http://jamesmdonnelly.com/GitHub/HamiltonianPaths

   The source code for this "game" is available for use
   at https://github.com/JamesDonnelly/HamiltonianPaths

   Equal-length lines in this disclaimer is coincidence

   No, really... It was unintentional... Anyway, © 2012
*/
var
	/* Create individual number box */
	createBoxByNumber = function(number, identifier) {
		/* This returns a dividier with a unique identifier (used as data-id), a stylable class
		   specific to that number, and the number displayed within the divier. */
		return '<div data-id="' + identifier + '"class="number-' + number + ' puzzleBox">' + number + '</div>';
	},

	/* Create the array of possible choices */
	createPuzzleArray = function(size, number) {
		var numberArray = [];

		/* Size controls the total number of numbers displayed within the puzzle. */
		for(var i=0;i<size;i++) {
			/* Using the values between 1 and n/2, we accept a number and generate random
			   numbers between. */
			   numberArray.push(Math.floor(Math.random() * ((number/2) - 1 + 1)) + 1)
		}

		return numberArray;
    }
;

	/* Create the puzzle itself */
$.fn.createPuzzle = function(size, number) {
	var 
		/* Create a reference to the element using the function */
		obj = this[0],

		/* We then create the array of choices. */
		numberArray = createPuzzleArray(size, number),

		/* We then use this array to create the puzzle's HTML */
		puzzle = '';

	/* Loop through the array to populate the HTML */
	for(var i=0;i<numberArray.length;i++) {
		puzzle += createBoxByNumber(numberArray[i], i);
	}

	/* Assign the puzzle size and number as a data values of the element. */
	$(obj).data('puzzleSize', size);
	$(obj).data('puzzleNumber', number);

	/* Finally, add the puzzle to the element. */
	$(obj).html(puzzle);
};

/* Puzzle box click */
$(document).on('click', 'div.puzzleBox', function() {
	/* Return if the divider has already been selected. */
	if($(this).hasClass('selected'))
		return;

	/* Boxes can only be clicked if no other boxes have been selected or if the box
	   follows on from the previous selection. */
	if($(this).data('selectable') || !$(this).parent().data('gameStarted'))
	{
		/* Loop through all selectable boxes */
		$('div.selectable').each(function() {
			/* Remove the selectable status of all other boxes */
			$(this).removeClass('selectable').data('selectable', false);
		});

		/* Determine the next available selection(s). */
		var
			total = $(this).parent().data('puzzleSize'),
			identifier = $(this).attr('data-id'),
			current = $(this).text(),
			clockwise = parseInt(identifier) + parseInt(current),
			anticlockwise = parseInt(identifier) - parseInt(current)
        ;

		/* If the clockwise or anticlockwise is more than the total or less than 0,
		   adjust the values. */
		if(clockwise >= total)
			clockwise = clockwise - total;
		if(anticlockwise < 0)
			anticlockwise = anticlockwise + total;

		/* Prevent this box being selected again. */
		$(this).addClass('selected');

		/* Set the clockwise and anticlockwise boxes to selectable. */
		if(!$(this).siblings('div[data-id="' + clockwise + '"]').hasClass('selected'))
			$(this).siblings('div[data-id="' + clockwise + '"]').data('selectable', true).addClass('selectable');

		if(!$(this).siblings('div[data-id="' + anticlockwise + '"]').hasClass('selected'))
			$(this).siblings('div[data-id="' + anticlockwise + '"]').data('selectable', true).addClass('selectable');
	}
	else
		return;

	/* Add the 'gameStarted' boolean to the container's data. */
	if(!$(this).parent().data('gameStarted'))
	{
		$(this).parent().append('<a class="puzzleRestart" href="#">Restart</a>');
		$(this).parent().data('gameStarted', true);

		$('a.puzzleRestart').click(function(e) {
			e.preventDefault();
			$(this).siblings('small').remove();
			$(this).siblings().remove();
			$(this).parent().removeData('gameStarted');
			$(this).parent().createPuzzle($(this).parent().data('puzzleSize'), $(this).parent().data('puzzleNumber'));
		})
	}

	/* Determine whether the game has ended */
	var endGame = true;
	var remaining = 0;
	$(this).siblings('div.puzzleBox').each(function() {
		if(!$(this).hasClass('selected'))
		{
			remaining++;

			if($(this).hasClass('selectable'))
				endGame = false;
		}
	});
	if(endGame)
	{
		if(remaining === 0)
			$(this).parent().append('<small class="puzzleNotice">Congratulations, you have completed this challenge!</small>');
		else
			$(this).parent().append('<small class="puzzleNotice">Oh no! There are no moves left, looks like it\'s game over!</small>')
	}
});