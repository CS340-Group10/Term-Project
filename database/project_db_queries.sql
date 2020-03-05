-- insert queries
INSERT INTO injuries (injury_type, injury_name, injury_notes)
	VALUES ('Knee', 'ACL tear', 'Very common in Football');

INSERT INTO sports (sport_name, professional_organization)
	VALUES ('Soccer', 'MLS');
	

--
-- Sample Data for table `sports`
--

INSERT INTO sports (sport_name, professional_organization) VALUES ('Baseball', 'Major League Baseball'),('Soccer', 'National League'),('Football', 'College Football'),('Hockey', 'National Hockey League');

--
-- Sample Data for table `teams`
--

INSERT INTO teams (team_name, organization, revenue, city, state, sport_id, active_salary_cap, signed) VALUES 
('New York Yankees', 'Major League Baseball', 668000000, 'New York City', 'New York', 1, 26000000, 40), ('Houston Astros', 'Major League Baseball', 368000000, 'Houston', 'Texas', 1, 13000000, 40), ('Los Angeles Dodgers', 'Major League Baseball', 549000000, 'Los Angeles Dodgers', 'California', 1, 31000000, 26), ('Toronto Maple Leafs', 'National Hockey League', 243000000, 'Toronto', 'Ontario', 4, 11000000, 24), ('Edmonton Oilers', 'National Hockey League', 154000000, 'Edmonton', 'Atlanta', 4, 15500000, 20),
('Montreal Canadiens', 'National Hockey League', 243000000, 'New York City', 'Quebec', 4, 10500000, 23);

-- select queries
-- Reports page: searching team name search bar
SELECT	team_name, revenue, city, state, sport FROM teams 
	JOIN sports
	ON	teams.team_id = sports.sport_id
WHERE	team_name = :teamNameInput;

-- update queries
-- Administration page: updating a sport
UPDATE sports 
	SET sport_name = :sportName, professional_organization = :profOrg
    WHERE sport_name = :sportName


-- delete queries
-- Administration page: delete sport
DELETE FROM sports
WHERE sport_name = :sportName

