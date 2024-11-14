# Stage 3 Database Implementation and Indexing

## Part 1: Database implementation

## is worth 10% and is graded as follows:

1. \+4% for implementing the database tables locally or on GCP, you should provide a screenshot of the connection (i.e. showing your terminal/command-line information)

2. \+4% for providing the DDL commands for your tables. (-0.5% for each mistake)

3. \+2% for inserting at least 1000 rows in the tables. (You should do a count query to show this, \-1% for each missing table)

## GCP Connection Screenshot

![alt text](stage3_img/image-1.png)

### DDL Create Table Command

### applications table  
```sql  
CREATE TABLE applications (  
    posting_id INT,  
    user_id INT,  
    application_date DATETIME,  
    PRIMARY KEY (posting_id, user_id),  
    FOREIGN KEY (posting_id) REFERENCES posting(posting_id),  
    FOREIGN KEY (user_id) REFERENCES user(user_id)  
);  
```

### school table  
```sql  
CREATE TABLE school (  
    school_id INT PRIMARY KEY,  
    school_name VARCHAR(256),  
    school_size INT,  
    school_address VARCHAR(256)  
);  
```

### leetcode_problem table  
```sql  
CREATE TABLE leetcode_problem (  
    problem_id INT PRIMARY KEY,  
    title VARCHAR(64),  
    description VARCHAR(256),  
    company_id INT,  
    url VARCHAR(256),  
    frequency INT,  
    rating INT,  
    FOREIGN KEY (company_id) REFERENCES employer_companies(company_id)  
);  
```

### user table  
```sql  
CREATE TABLE user (  
    user_id INT PRIMARY KEY,  
    school_id INT,  
    company_id INT,  
    year INT,  
    user_name VARCHAR(256),  
    skills VARCHAR(512),  
    current_streak INT,  
    points INT,  
    FOREIGN KEY (school_id) REFERENCES school(school_id),  
    FOREIGN KEY (company_id) REFERENCES employer_companies(company_id)  
);  
```

### posting table  
```sql  
CREATE TABLE posting (  
    posting_id INT PRIMARY KEY,  
    job_name VARCHAR(256),  
    job_description VARCHAR(256),  
    med_salary INT,  
    sponsor VARCHAR(32),  
    remote_allowed VARCHAR(10),  
    location VARCHAR(32),  
    post_date DATETIME,  
    ng_or_internship VARCHAR(32),  
    company_id INT,  
    FOREIGN KEY (company_id) REFERENCES employer_companies(company_id)  
);  
```

### employer_companies table  
```sql  
CREATE TABLE employer_companies (  
    company_id INT PRIMARY KEY,  
    company_name VARCHAR(32),  
    description VARCHAR(256),  
    url VARCHAR(32),  
    address VARCHAR(64)  
);  
```

### interview_question table  
```sql  
CREATE TABLE interview_question (  
    problem_id INT,  
    company_name VARCHAR(32),  
    PRIMARY KEY (problem_id, company_name),  
    FOREIGN KEY (problem_id) REFERENCES leetcode_problem(problem_id),  
    FOREIGN KEY (company_name) REFERENCES employer_companies(company_name)  
);
```

### Inserting at least 1000 rows in 3 tables

Source  
[https://www.kaggle.com/datasets/joebeachcapital/us-colleges-and-universities](https://www.kaggle.com/datasets/joebeachcapital/us-colleges-and-universities)  
[https://www.kaggle.com/datasets/arshkon/linkedin-job-postings/data](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings/data)

Summary  
**Table Name : \# of rows inserted**

| posting : 123845 | employer\_companies : 24472 | school : 6475 |
| :---- | :---- | :---- |
| ![alt text](stage3_img/image-2.png)| ![alt text](stage3_img/image-3.png) | ![alt text](stage3_img/image-4.png) |

## Part 2: Advanced Queries

### are worth 10% and are graded as follows:

1. \+8% for developing four advanced queries (see point 4 for this stage, 2% each)

2. \+2% for providing screenshots with the top 15 rows of the advanced query results (0.5% each)

#### 1\. **Query for Finding Popular Job Postings by Application Count**

This query identifies the most popular job postings, based on the number of applications submitted, providing insights into which jobs users are most interested in.

```sql
SELECT p.job_name,p.company_id, COUNT(a.user_id) AS application_count  
FROM posting p  
JOIN applications a ON p.posting_id = a.posting_id  
GROUP BY p.job_name, p.company_id  
ORDER BY application_count DESC;
```

![alt text](stage3_img/image-5.png)

---

#### 2\. **Query for Displaying User Streak Information and Point Rankings**

This query generates a leaderboard showing users ranked by their streak length and total points. It can be used to create a gamified experience, motivating users to maintain high streaks.

```sql
SELECT ec.company_name, COUNT(DISTINCT p.location) AS city_count, AVG(p.med_salary) AS avg_salary
FROM employer_companies AS ec
JOIN posting AS p ON ec.company_id = p.company_id
GROUP BY ec.company_name
HAVING AVG(p.med_salary) > (
    SELECT AVG(med_salary) FROM posting
) AND COUNT(DISTINCT p.location) > 1
ORDER BY avg_salary DESC;
```

![alt text](stage3_img/image-6.png)
Result less than 15 rows

---

#### 3\. **Query for Remote Job count offered by various companies**

This query retrieves the company names and remote work availability from job postings, along with a count of job postings (\`num\`) for each company. It leverages a natural join between the \`posting\` and \`employer\_companies\` tables, grouping the results by \`company\_name\` and \`remote\_allowed\`. This aggregation provides insight into the number of job postings each company offers and whether remote work is an option for each listing.

```sql
SELECT company_name, remote_allowed, COUNT(*) AS num  
FROM posting  
NATURAL JOIN employer_companies  
GROUP BY company_name, remote_allowed;
```
![alt text](stage3_img/image-7.png) 
---

#### 4\. **Query for Top Schools with Most Applications Submitted**

This query lists schools by the number of job applications their students have submitted, highlighting institutions with high job-seeking activity.

```sql
SELECT s.school_name, COUNT(a.user_id) AS total_applications  
FROM school s  
JOIN user u ON s.school_id = u.school_id  
JOIN applications a ON u.user_id = a.user_id  
GROUP BY s.school_name  
ORDER BY total_applications DESC;
```
![alt text](stage3_img/image-8.png)


## Part 3: Indexing Analysis 

is worth 10% and is graded as follows:

1. \+3% on trying at least three different indexing designs (excluding the default index) for each advanced query.  
2. \+5% on the indexing analysis reports which includes screenshots of the EXPLAIN ANALYZE commands.  
3. \+2% on the accuracy and thoroughness of the analyses.

#### 1\. **Query for Finding Popular Job Postings by Application Count**

First we run EXPLAIN ANALYZE on the current query as is.  
![alt text](stage3_img/image-9.png)

Given the query that we have, all the JOIN attributes are already primary keys which we are trying to avoid adding an index for. That leaves *job\_name* on the posting table in the GROUP BY attributes. We add an index for *job\_name* and run the query again.  
![alt text](stage3_img/image-10.png)
   
Since we see no difference in the costs, we don’t keep this index.

#### 2\. **Query for Displaying User Streak Information and Point Rankings**

First we run EXPLAIN ANALYZE on the current query as is.  
![alt text](stage3_img/image-11.png)

Given the query that we have, and run the query again.  
![alt text](stage3_img/image-12.png)
   
Since we see no difference in the costs, we don’t keep this index.

#### 3\. **Query for Remote Job count offered by various companies**

First we run EXPLAIN ANALYZE on the current query as is.

![alt text](stage3_img/image-13.png)
Given the query that we have, all the JOIN attributes are already primary keys which we are trying to avoid adding an index for. That leaves *school\_name* on the school table. We add an index for *school\_name* and run the query again.

![alt text](stage3_img/image-14.png)
Since we see no difference in the costs, we don’t keep this index.

#### 4\. **Query for Top Schools with Most Applications Submitted**

First we run EXPLAIN ANALYZE on the current query as is.

![alt text](stage3_img/image-15.png) 
Given the query that we have, all the JOIN attributes are already primary keys which we are trying to avoid adding an index for. That leaves *school\_name* on the school table. We add an index for *school\_name* and run the query again.

![alt text](stage3_img/image-16.png)
We see no difference here. The explanation is simple, each school has a unique name and since we are querying through every school, the query must go through every row anyways. Therefore, we don’t keep this index.  

