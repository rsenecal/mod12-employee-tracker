INSERT INTO department(department_name)
VALUES("Engineering"), ("Finance"),("Legal"),("Sales");

INSERT INTO role(title, salary, department_id)
VALUES
	("Sales Lead", 100000, 4), 
	("Sales Person", 80000, 4), 
	("Lead Engineer", 150000, 1), 
	("Software Engineer", 120000, 1),
	("Account Manager", 160000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Olivia', 'Freya', 1, 3), ('Oscar', 'Willow', 1, null), ('Lily', 'Harper', 1, 3), ('Muhammad', 'James', 4, 1), ('Grace', 'Isla', 4, null);