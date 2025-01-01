# Jobkinator ([Website](https://jobkinator.web.app/))
Jobkinator is a web application designed to streamline and gamify the often daunting process of searching for jobs or internships.

## Project Description:

Built using React and TypeScript for the user interface and FastAPI for handling API requests to an SQL database, it provides users with tools to search and filter job listings, track their applications, and maintain motivation through features like streaks and leaderboards. These gamified elements reward users for their consistency, creating a sense of achievement and fostering healthy competition to encourage daily engagement. By integrating advanced SQL queries and robust backend functionalities, Jobkinator simplifies the job hunting process while making it more interactive and engaging. Ultimately, the application aims to increase users' chances of landing their desired roles by fostering persistence and enthusiasm in the application process.


## Information for Collaborators:

Clone the repository using this url: 

```https://github.com/bose-pramuanpornsatid/jobkinator-platform-project.git```

### Folder Structure
Jobkinator\
├- client\
├- data_import\
├- docs\
├- server

| folder      | info                                                      |
| ----------- | --------------------------------------------------------- |
| client      | Frontend (Vite + React + Typescript)                      |
| data_import | Data Cleaning + Imports (Jupyter Notebook)                |
| docs        | Project Documents (Proposal + Database Design + API Docs) |
| server      | Backend (Python + FastAPI)                                |

### Client (Frontend) Installation Instruction

0. Install npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. Navigate to client 
```bash
cd client
```

2. Install npm dependencies
```bash
npm install
```

3. Running the development server
```bash
npm run dev
```

### Server (Backend) Installation Instruction
0. Install Python: https://www.python.org/downloads/
1. Navigate to server
```bash
cd server
```

2. Create a virtual environment
```bash
python -m venv venv
```

3. Activate the virtual environment
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Install the required dependencies
```bash
pip install -r requirements.txt
```

5. Running the FastAPI server
```bash
uvicorn main:app --reload
```

### data_import (Data Cleaning + Imports) Installation Instruction
0. Install Python: https://www.python.org/downloads/
1. Navigate to data_import
```bash
cd data_import
```

2. Create a virtual environment
```bash
python -m venv venv
```

3. Activate the virtual environment
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Install the required dependencies
```bash
pip install -r requirements.txt
```

5. Run the Jupyter Notebook
```bash
jupyter notebook
```

## Future Plans

We want to 'gamify' the process of applying to Full-Time Positions / Internships. This is accomplished through having people build their own internship 'personality' representing which jobs or technical domains they are interested in and using that to create a custom set of filters for jobs that they are interested in. We can also let people access the interface directly using the filter to determine which jobs they want.

As an extra layer on top of this concept we want to make it a social system where you can collect 'streaks' for continually applying to jobs much like duolingo and possibly have a friends system setup where you can track and update each other on progress. You can also combine this with the personality concept to come up with levels or experience points to further extend the game concept. The point is to drive motivation for applying to internships and encourage people to keep on applying




