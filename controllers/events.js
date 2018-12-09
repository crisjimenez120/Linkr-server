const express = require('express');
const models = require('../models');
//const utility = require("./utility");
const router = express.Router();

// -------------[TESTING CONNECTION]---------------
router.get("/", (request, response) => {
  console.log("IT WORKS");
})

// -------------[GET]---------------
router.post("/api_events", (request, response) => { 

  models.events.findAll({
    where:
    {
      user_email: request.body.user_email
    }
  }).then(events => {
    response.send(events);
  });
});

// // Takes a group ID and then return all the events of all users in the group //
// router.post("/api_merged_events", (request, response) => { 
// 	models.sequelize.query(
// 		`SELECT * FROM events, (SELECT * FROM groups_to_users WHERE group_id = '${request.body.group_id}')
// 		A WHERE events.user_email = A.user_email;`,
// 		{model: models.events})
// 	.then(events => {
//   		let merged = MergeIntervals (events);
//     	response.send(merged);
//   }).catch(err => {
//   	console.log ("Error while merging intervals")
//   });
// });

// -------------[POST]---------------
//basic route to ADD a mock entry
router.post("/api_create_event", (request, response) => {

  console.log("WE IN IT");

  models.events.create({
    title: request.body.title,
    start: request.body.start,
    end: request.body.end,
    user_email: request.body.user_email,
    user_name: request.body.user_name
    
  }).then((get) => {
    //response.redirect('/api_events');
    console.log("SUCCESS, WE ADDED A USER MADE THING");
    response.send(200);
  }).catch((err) => {
      console.log(err);
    });
});

// -------------[PUT]---------------
router.put("/api_update_event", (request, response) =>{

  models.events.update(
  {
    title: request.body.title,
    start: request.body.start,
    end: request.body.end
  },
  {
    where: // match based on the user's id //
    {
      id: request.body.id
    }
  }).then((get) =>{
    //response.redirect("/api_events");
    console.log ("UPdate done?")
    response.send(200);
  }).catch((error) => {
    console.log("ERROR while updating the requested event");
  })
});

// -------------[DELETE]---------------

//basic route to REMOVE the mock entry

router.delete("/api_delete_event", (request, response) => {
  models.events.destroy({
    where: {
		id: request.body.id
    }
  }).then((get) => {
    console.log ("Delete done?")
    response.send(200);
  }).catch((err) => {
      console.log('ERROR while deleting the requested event');
  });
});


module.exports = router;


// Utility Functions Called Above. Merge Intervals takes a group of events and returns generic events that exclude overlapping
// intervals
// function MergeIntervals (events) {
// 	let merged = [];
// 	events = BubbleSort(events);
// 	for (let i = 0; i < events.length; i++) {
// 		if (merged.length != 0 && merged[merged.length-1].end >= events[i].start) { // is overlap
// 			let maxEnd = MaxDate(merged[merged.length-1].start, events[i].start);
// 			let merge = {title: "merged event", start: merged[merged.length-1].start, end: maxEnd};
// 			merged[merged.length-1].end = merge;
// 		} else // no overlap
// 			merged.push(events[i]);
// 	}
// 	return merged;
// }

// function BubbleSort(array) {  
//    for (let i = 0; i < array.length-1; i++)       
//        // Last i elements are already in place    
//        for (let j = 0; j < array.length-i-1; j++) {
//        		let d1 = new Date(array[j].start);
//        		let d2 = new Date(array[j+1].start);
// 			if (d1.getTime() > d2.getTime()) 
//               Swap(array[j], array[j+1]);
//        }
// 	return array; 
// }

// function MaxDate (date1, date2) {
// 	let d1 = new Date(date1);
// 	let d2 = new Date(date2);
// 	return d1.getTime >= d2.getTime ? date1 : date2;
// }

// function Swap (array, i, j) {
// 	let tmp = array[i];
// 	array[i] = array[j];
// 	array[j] = tmp;
// }
