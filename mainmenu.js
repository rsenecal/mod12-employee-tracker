const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'red8mak11',
    database: 'mod12'

});



console.log(logo(config).render());


const mainMenu = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'mainmenu',
            message: 'What would you like to do? :',
            choices: [
                new inquirer.Separator('= View ='),
                {
                    name: 'View All Employee',
                },
                {
                    name:  'View All Roles',
                },
                {
                    name: 'View All Departments',
                },
                new inquirer.Separator('= Add =='),
                {
                    name: 'Add Employee',
                },
                {
                    name: 'Add Role',
                },
                {
                    name: 'Add Department',
                },
                new inquirer.Separator('= Update =='),
                {
                    name: 'Update Employee Role',
                },
                new inquirer.Separator('= Quit App =='),
                {
                    name: 'Quit',
                },

                new inquirer.Separator()
              ],
        }
    ])

.then(menuSelected => {
    switch (menuSelected.mainmenu) {
        case "View All Employee":
            allEmployee();
            break;
        case "View All Roles":
            allRoles();
            break;
        case "View All Departments":
            allDepartments();
            break;

        case "Update Employee Role":
            updateEployee();
            break;

        case "Add Employee":
            promptEmployee();
            break;
        case "Add Role":
                addRole();
        break;

        case "Add Department":
            addDepartments();
            break;
        case "Quit":
            quitApp();
            break;
        
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
        name: 'last_name',
        message: "Please the employee's last name: ",
        validate: last_name => {
            if (last_name) {
                return true
            } else {
                console.log('Please try again, Enter Empoyee last name: ')
            }
        }
    },
    
    ])
    .then(answer => {
        const empData = [answer.first_name, answer.last_name];
        const mngQuery = 'SELECT * FROM employee';
        connection.query(mngQuery, (err, data)=> {
            if(err) throw err;
            const mngList = data.map(({id, first_name, last_name}) =>({name:first_name + " " + last_name, value: id}));
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'manager',
                    message: "Select the name of your manager.",
                    choices: mngList
                }
            ])
            .then(selectedManager => {
                const empManager = selectedManager.manager;
                empData.push(empManager);
                const roleQuery = 'SELECT id, title FROM role';
                connection.query(roleQuery, (err, data) => {
                    if(err) throw err;
                    const roleList = data.map(({id, title}) => ({name: title, value: id}));
                    inquirer.prompt ([
                        {
                            type: 'list',
                            name: 'role',
                            message: "Select your employee's role.",
                            choices: roleList 
                        }
                    ])
                    .then(selectedRole => {
                        const empRole = selectedRole.role;
                        empData.push(empRole);
                       
                        const addEmpQuery = `INSERT INTO employee (first_name, last_name, manager_id, role_id)
                        VALUES (?, ?, ?, ?)`;
                       
                        connection.query(addEmpQuery, empData, (err) => {
                            if(err) throw err;
                        console.log("Employee Added: ");
                        mainMenu();
                        });

                    });
                });
            });

        });
    });

};

// // Testing that connection to the database is working.. to be commented out later
// function addEmployee() {    
//     connection.connect(function(err){
//         if (err) throw err;
//         console.log("connected !!");
//         var sql = "INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('JESSICA', 'Senecal', 2, 1)";
//         connection.query(sql, function(err, result) {
//             if (err) throw err;
//             console.log("1 Record Added");
//         });
//     });
// }
    // function addEmployee() {
    



function allEmployee() {
    connection.connect(function(err){
        if (err) throw err;
        console.log("connected !!");
        var sql = `SELECT e.*, r.title, r.salary, d.department_name, CONCAT(m.first_name,' ', m.last_name) as Manager
        FROM employee e
        LEFT JOIN employee m
        ON e.id = m.manager_id
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id;`;
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.table(result);
        });
    });
    mainMenu()
}

 
function allRoles() {

    connection.connect(function(err){
        if (err) throw err;
        console.log("connected !!");
        var sql = `SELECT r.id, r.title, r.salary, d.department_name
        FROM role r
        LEFT JOIN department d
        ON r.department_id = d.id;`;
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.table(result);
        });
    });
    mainMenu()

}

function allDepartments() {
connection.connect(function(err){
    if (err) throw err;
    console.log("connected !!");
    var sql = `SELECT * from department; `;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.table(result);
    });
});
mainMenu()
    
}


module.exports = mainMenu;