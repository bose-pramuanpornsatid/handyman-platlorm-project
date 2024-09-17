1. Project Title: Jobkinator (“Job-aKinator”)  
     
2. Project Summary:   
   We want to ‘gamify’ the process of applying to Full-Time Positions / Internships. This is accomplished through having people build their own internship ‘personality’ representing which jobs or technical domains they are interested in and using that to create a custom set of filters for jobs that they are interested in. We can also let people access the interface directly using the filter to determine which jobs they want.  
     
   As an extra layer on top of this concept we want to make it a social system where you can collect ‘streaks’ for continually applying to jobs much like duolingo and possibly have a friends system setup where you can track and update each other on progress. You can also combine this with the personality concept to come up with levels or experience points to further extend the game concept. The point is to drive motivation for applying to internships and encourage people to keep on applying  
     
3. Description:   
   Looking for an internship can be a daunting task, as the market consists of hundreds or thousands of myriad companies specializing in different industries or products. Finding the right company can take a lot of time, so we want to create an application that will take some burden off the job seekers so that they can focus on refining their resume and technical knowledge while also looking at roles that they’d most likely be interested in.  
     
   Creating a simple filter will do the job, however we want to add some extra incentives for students or job seekers to apply. We figured that we could best do that by gamifying the system: first, we create an Akinator/Duolingo  questioning interface that will collect data about what type of role and company the applicant is looking for. Then, we maintain a database to track the ‘points’ of a user \- the algorithm will take into account the streak of days someone has applied, the number of applications per day, etc. We will also add some additional features to make our app more feature-rich and user-friendly.

4. Creative Component (Technically Challenging Feature):  
   1. Daily streaks increase user engagement and promote people to keep on applying to jobs. To accomplish this we need to create database tracking info about each user and build relations to explore their usage of the site over time and also their engagement, e.g how many internships they applied to.   
   2. Intern Personality result with curated internship feeds using automated pattern recognition and filtering to ensure that job listings are accurate.  
   3. If we have time we can also do statistical analysis using aggregate functions and relations to build graphs of what jobs are being applied to the most or what fields are most popular right now.  
   4. We need to do a lot of data cleaning and cataloging as some of the datasets for intern applications are not very clean.   
        
5. Usefulness:  
   1. Internship finder for job hunter  
   2. Filter relevant internship to apply  
   3. Streak tracker creates incentive for user to apply everyday  
   4. Track current internship   
6. Realness:  
   1. We are going to maintain a database consisting of 2 tables:  
- NewGrad \+ Internship dataset sourced online in .csv form (Kaggle, Github, etc.). We are looking at datasets with 200+ internships/ new grad roles.  
- We will maintain a local database of users for tracking users’ progress (MySQL table). Because it is MySQL, the database should scale reasonably with the number of users in the audience  
- Database for total applications made on the website  
  2. Dataset  
     1. [https://www.kaggle.com/datasets/arshkon/linkedin-job-postings](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings)  
     2. [https://www.kaggle.com/datasets/emreksz/software-engineer-jobs-and-salaries-2024](https://www.kaggle.com/datasets/emreksz/software-engineer-jobs-and-salaries-2024)  
7. Functionality:  
   1. UI Mockup:

![][image1]

8. Project Work Distribution:  
   1. Daniel: Backend, User Tracking and Database Management, Unit Testing  
      2. Hieu: Middleware, API Management, Ensuring that Front End matches with Backend for feature parity, Integration Testing and Work involving   
      3. Bose: Frontend, Frontend testing, creating pages involving job applications and filtering menus  
      4. Amy: Frontend, Frontend testing, creating pages involving user profiles and user personality management, UX/UI design, project vision leader. 
   2. UI Mockup:
      ![alt text](UI_Mockup.jpg)****