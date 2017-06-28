

// replace this entire code block with the config found in the firebase dashboard
// for your created database
 var config = {
    apiKey: "AIzaSyCAQFIQEs8taadHd88iXT1BoouRdv4uog4",
    authDomain: "sabila-project-1.firebaseapp.com",
    databaseURL: "https://sabila-project-1.firebaseio.com",
    projectId: "sabila-project-1",
    storageBucket: "sabila-project-1.appspot.com",
    messagingSenderId: "432535496569"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
$(function(){
	$('#add-button').on('click', function(){
		var value = $('#new-item').val()
		//grab a reference to the "todo items key in firebase and then crete a new item that we set data on"
		var item = database.ref("/todo-items").push();
		item.set({value: value, chicken: "chicken"})
	})
	//grab a reference to the todo-items key and 
	database.ref("/todo-items").on("value",function(snapshot){
		var list = $('#list-items');
		list.empty();
		console.log(snapshot.val());

		snapshot.forEach(function(listItem){
			var item = listItem.val().value;
			list.append('<li data-id="' + listItem.key +'">' + item + ' <a href="#" class="remove">Remove</a></li>');

		})
	})
	//add an event listener for every a tag inside of a li tag in our list
	$('#list-items').on('click','li a',function(){
		var itemId = $(this).parent().data('id');
		console.log("hello")
		database.ref("/todo-items/" + itemId).remove();
	});
})
