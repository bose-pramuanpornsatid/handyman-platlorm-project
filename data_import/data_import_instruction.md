# Data Import Instructions for Posting

https://www.kaggle.com/datasets/arshkon/linkedin-job-postings/data

## Table Schema
```
posting(
	posting_id: int [pk],
	job_name: varchar(256),
	job_description: varchar(256),
	med_salary: int,
	sponsor: varchar(32),
	remote_allowed: varchar(10),
	location: varchar(32),
	post_date: datetime,
	ng_or_internship: varchar(32),
	company_id: int [fk to employer_companies.company_id]
)
```

## Python data cleaning

[Jupyter Notebook](./posting.ipynb)
```python
import kagglehub

# Download latest version
path = kagglehub.dataset_download("arshkon/linkedin-job-postings")

print("Path to dataset files:", path)

import pandas as pd

# Load the CSV
df = pd.read_csv(path + "/postings.csv", encoding='utf-8', on_bad_lines='skip') 

# Remove non-ASCII characters from all object (text) columns
for column in df.select_dtypes(include=['object']).columns:
    df[column] = df[column].str.encode('ascii', 'ignore').str.decode('ascii')
    df[column] = df[column].str.replace('\n', ' ').str.replace('\r', ' ')

# Continue with processing and saving
posting = df[['job_id', 'title', 'description', 'normalized_salary', 'sponsored', 'remote_allowed', 'location', 'original_listed_time', 'formatted_experience_level', 'company_id']].copy()
posting.columns = ['posting_id', 'job_name', 'job_description', 'med_salary', 'sponsor', 'remote_allowed', 'location', 'post_date', 'ng_or_internship', 'company_id']

# Convert post_date to datetime
posting['post_date'] = pd.to_datetime(posting['post_date'], unit='ms', errors='coerce')

# Save as a cleaned UTF-8 CSV
posting.to_csv('posting.csv', index=False, encoding='utf-8', sep=';', na_rep='NULL')
# posting.head(1000).to_csv('posting.csv', index=False, encoding='utf-8', sep=';', na_rep='NULL')
```

| Column             | Type   |
|--------------------|--------|
| company_id         | text   |
| job_description    | text   |
| job_name           | text   |
| location           | text   |
| med_salary         | double |
| ng_or_internship   | text   |
| post_date          | text   |
| posting_id         | bigint |
| remote_allowed     | text   |
| sponsor            | int    |


### Setup Table
```SQL
ALTER TABLE project.posting_sample MODIFY COLUMN posting_id BIGINT;
```

### Import
```SQL
LOAD DATA LOCAL INFILE '/.../posting.csv' 
INTO TABLE project.posting_sample
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
```
