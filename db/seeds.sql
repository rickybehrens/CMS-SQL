INSERT INTO department (name)
VALUES ("Sales and Marketing"),
       ("IT"),
       ("Legal"),
       ("Accounting"),
       ("Purchasing"),
       ("HR"),
       ("Production");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Person", 60000), -- 1
       (1, "Sales Manager", 90000), -- 2
       (1, "Market Analyst", 60000), -- 3
       (1, "Senior Market Analyst", 75000), -- 4
       (1, "Marketing Manager", 90000), -- 5
       (2, "Programmer", 60000), -- 6
       (2, "Senior Programmer", 75000), -- 7
       (2, "IT Manager", 90000), -- 8
       (3, "Paralegal", 60000), -- 9
       (3, "Counsel", 90000), -- 10
       (3, "Chief Legal Counsel", 150000), -- 11
       (4, "Financial Analyst", 60000), -- 12
       (4, "Accounting Manager", 90000), -- 13
       (4, "CFO", 250000), -- 14
       (5, "Procurement Specialist", 60000), -- 15
       (5, "Supply Chain Manager", 90000), -- 16
       (6, "HR Coordinator", 60000), -- 17
       (6, "HR Manager", 90000), -- 18
       (7, "Line Employee", 45000), -- 19
       (7, "Line Manager", 60000), -- 20
       (7, "Production Manager", 90000), -- 21
       (7, "COO", 250000), -- 22
       (7, "CEO", 500000); -- 23

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Courtney", "Cox", 23, null),
       ("Michael", "Garrigus", 22, null),
       ("Marcus", "Gambia", 18, null),
       ("Al", "Smith", 16, null),
       ("Charles", "Ivery", 14, null),
       ("Edward", "Zea", 11, null),
       ("Edward", "Walsh", 8, null),
       ("Frederic", "Plummer", 5, null),
       ("Gustav", "Moser", 2, null),
       ("Jhonny", "Valle", 1, 2),
       ("Joseph", "Vizcaya", 1, 2),
       ("Lauren", "Marlow", 1, 2),
       ("Maurizio", "Acquavella", 3, 5),
       ("Raphale", "Benclaire", 4, 5),
       ("Richard", "Behr", 6, 8),
       ("Wolfgang", "Van Halen", 7, 8),
       ("Suzanne", "Knowles", 9, 11),
       ("Charleen", "Floyd", 10, 11),
       ("Jane", "Applesmith", 12, 14),
       ("Emma", "Moose", 13, 14),
       ("Jessica", "Morgan", 15, 16),
       ("Morgan", "Gill", 17, 18),
       ("Shawn", "Muller", 19, 21),
       ("Trey", "Johnson", 20, 21),
       ("John", "Treyson", 21, 22);