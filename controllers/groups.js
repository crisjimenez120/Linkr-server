const express = require('express');
const models = require('../models');
var sequelize = require("sequelize"); //Using sequelize

const router = express.Router();

//basic route to create a group
router.get("/api_all_groups", (request, response) => {

  console.log("WE GETTING ALL GROUPS");

  models.groups.findAll().then((results) => {
   
   response.send(results);
  }).catch((err) => {
      console.log(err);
    });
});


/*
//5:20pm
router.get("/api_get_all_users_for_group", (request, response) => {
  

  console.log("WE GETTING ALL USERS FOR ONE GROUP");

  models.sequelize.query(
  `SELECT groups_to_users.email FROM groups_to_users WHERE groups_to_users.group_id = '${request.body.group_id}';`) 
  .then((results) => {
  
    console.log(results);
    response.send(results);

  }).catch((err) =>{
    console.log(err);
  });

});
*/


//basic route to create a group
router.post("/api_create_group", (request, response) => {

  console.log("WE CREATING A GROUP");

  models.groups.create({

    group_name: request.body.groupName,
    group_desc: request.body.groupDesc,
    admin: request.body.email

    /*group_name: "Something Group",
    group_desc: "Studying CSCI",
    admin: "email@email.com"*/
    
  }).then((newgroup) => {
   
    console.log("SUCCESS, WE MADE A GROUP");

    models.groups_to_user.create({
    	group_id: newgroup.id,
    	user_email: newgroup.admin
    }).then((newentry) => {

    	console.log("WE ADDED SOMETHING TO groups_to_user");
    	response.send(newentry);
    }).catch((err) => {
    	console.log(err);
    })

  }).catch((err) => {
      console.log(err);
  });

});

// Update a group //
router.put("/api_update_group", (request, response) => {
  models.groups.update({
    group_name: request.body.group_name,
    group_desc: request.body.group_desc,
    admin: request.body.admin
  },
  {
  where: {
      id: request.body.id
  }
  }).then((updated) => {
    console.log("updated CSCI GROUP");
    response.send(200);
  }).catch((err) => {
    console.log(err);
  });
});

// Delete a group //
router.delete("/api_delete_group", (request, response) => {
  models.groups_to_user.destroy({
    where : {
      group_id: request.body.id
    }
  });
  models.groups.destroy({
    where: {
      id: request.body.id
    }
  }).then((deleted) => {
    console.log("DELETE CSCI GROUP");
    response.send(200);
  }).catch((err) => {
    console.log(err);
  });
});



router.delete("/api_delete_groups_to_users", (request, response) => {

  console.log("WE DELETE A HOMIE");

  models.groups_to_user.destroy({
    where: {
      group_id: request.body.group_id,
      user_email: request.body.email
    }
  }).then((get) => {

    console.log("DELETED A USER GROUP W.E.");
    response.send(200);
  });

});


router.post("/api_add_groups_to_user", (request, response) => {

  models.groups_to_user.create({

    group_id: request.body.group_id,
    user_email: request.body.email

  }).then( (results) => {
    console.log("We're adding a user to the groups_to_user");
    response.send(200);
  }); 
});


//basic route to get a group for a single user
router.post("/api_all_groups_single_user", (request, response) => {

  console.log("WE GETTING ALL GROUPS FOR ONE USER");

  
  models.sequelize.query(
  `SELECT * FROM groups, (SELECT * FROM groups_to_users WHERE user_email = '${request.body.user_email}') A WHERE groups.id = A.group_id;`,
  {model: models.groups}) 
  .then((groups) => {
  
    console.log(groups);
    response.send(groups);

  }).catch((err) =>{
    console.log(err);
  });
  
});



//3:00pm
router.post("/api_get_all_events_for_group", (request, response) => {


  console.log("WE GETTING ALL EVENTS FOR ONE GROUP");

  models.sequelize.query(
  `SELECT * FROM events, (SELECT * FROM groups_to_users WHERE group_id = '${request.body.group_id}') A WHERE events.user_email = A.user_email;`,
  {model: models.events}) 
  .then((events) => {
  
    console.log(events);
    response.send(events);

  }).catch((err) =>{
    console.log(err);
  });
  /*

    1) get all group_id from request
    2) get all the user_emails from the group_to_users table where the row's group_id == id
  */

});

//5:38pm - done
router.post("/api_get_all_users_for_group", (request, response) => {


  console.log("WE GETTING ALL USERS FOR ONE GROUP");

  models.sequelize.query(
  `SELECT groups_to_users.user_email FROM groups_to_users WHERE groups_to_users.group_id = '${request.body.group_id}';`, 
  {type: models.sequelize.QueryTypes.SELECT}) 
  .then((results) => {
  
    console.log(results);
    response.send(results);

  }).catch((err) =>{
    console.log(err);
  });

});



/*
//basic route to create a group
router.get("/api_all_groups_single_user", (request, response) => {

  console.log("WE GETTING ALL GROUPS FOR ONE USER");

  /*
  1)  Get the unique groups in groups_to_users where the user_email == request.body.user_email (in a set)
  2)  With that set, get the group_name and memeber count (seperate function/route) for each item in that set
  3)  response.send(results_from_2);

  To Delete subset from main set:

  DELETE FROM sections WHERE sections.course_ID IN (SELECT courses.course_ID from 
  courses);
  
  models.groups_to_user.findAll({
    where:
    {
      user_email: "email@email.com"
    }
  }).then((results_from_1) => {
   
    console.log("NOW WE HERE");
    //console.log(results_from_1);

    /*
      at this point we have N group id's 
      
/*
          group_id     user_email
      6 |       15 | email@email.com | 2018-12-02 11:55:06.814-05 | 2018-12-02 11:55:06.814-05
      7 |       16 | email@email.com


      
    /*
    // Callee is the model definition. This allows you to easily map a query to a predefined model
    sequelize.query('SELECT * FROM projects', { model: Projects }).then(projects => {
      // Each record will now be a instance of Project
    })



    return all the entires in groups where the "id" = results_from_1.id

      DELETE FROM sections WHERE sections.course_ID IN (SELECT courses.course_ID from 
  courses);

  SELECT FROM groups WHERE groups.id IN (SELECT groups_to_users.group_id FROM groups_to_users)
    

// models.sequelize.query('SELECT * FROM groups WHERE groups.id IN (SELECT groups_to_users.group_id FROM (SELECT * FROM \
//   groups_to_users WHERE groups_to_users.user_email = "email@email.com")) ;').then( (groups) => {
  
//   console.log(groups);

// })



//   models.sequelize.query(`SELECT * FROM groups WHERE groups.id IN ${results_from_1}`).then( (groups) => {
  
//   console.log(groups);

// })

// models.sequelize.query('SELECT * FROM groups_to_users AS "groups_to_user" WHERE "groups_to_users"."user_email" = "email@email.com" ').then( (groups) => {
  
//   console.log(groups);

// })

//, { model: Projects }).then(projects => {


models.sequelize.query(
  " SELECT * FROM groups, (SELECT * FROM groups_to_users WHERE user_email = 'email@email.com') A WHERE groups.id = A.group_id;",
  {model: models.groups}) 
  .then( (groups) => {
  
    console.log(groups);
    response.send(groups);

}).catch((err) =>{
  console.log(err);
});



  }).catch((err) => {
      console.log(err);
    });
});


models.events.findAll({
    where:
    {
      user_email: request.body.user_email
    }
  }).then(events => {
    response.send(events);
  });
*/






module.exports = router;