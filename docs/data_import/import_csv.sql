LOAD DATA LOCAL INFILE '/Users/bose/Documents/Code/UIUC/cs411-database-system/fa24-cs411-team067-FallFun/server/posting.csv' 
INTO TABLE project.posting
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS

