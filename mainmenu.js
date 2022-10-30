const inquirer = require('inquirer');



const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'red8mak11',
    database: 'mod12'

});



console.log(
    `=============================================================================================================
    '                  E M P L O Y E E     T R A C K E R - M O D U L E   1 2                                      
    ==============================================================================================================
    
    
    `
  );

const mainMenu = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'mainmenu',
            message: 'What would you like to do? :',
            choices: ['View All Employee', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ])

.then(menuSelected => {
    switch (menuSelected.mainmenu) {
        case "View All Employee":
            allEmployee();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEployee();
            break;
        case "View All Roles":
            allRoles();
            break;
        case "Add Role":
            addRole();
            break;
        case "View All Departments":
            allDepartments();
            break;
        case "Add Department":
            addDepartments();
            break;
        case "Quit":
            quitApp();
            break;
        default:
            quitApp ();
        
    }
})
}



const promptEmployee = ()  => {
    console.log('Add a new employee');

    return inquirer.prompt ([

    {
        type: 'input',
        name: 'first_name',
        message: "Please the employee's first name: ",
        validate: first_name => {
            if (first_name) {
                return true
            } else {
                console.log('Please try again, Enter Empoyee first name: ')
            }
        }
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Please the employee's first name: ",
        validate: first_name => {
            if (first_name) {
                return true
            } else {
                console.log('Please try again, Enter Empoyee first name: ')
            }
        }
    },
    


    ])

}

function addEmployee() {    
    connection.connect(function(err){
        if (err) throw err;
        console.log("connected !!");
        var sql = "INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('JESSICA', 'Senecal', 2, 1)";
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log("1 Record Added");
        });
    });
}
    // function addEmployee() {
    


module.exports = mainMenu;