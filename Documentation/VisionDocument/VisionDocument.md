# Vision Document

GitHub repository monitoring tool.


## 1. Introduction

### 1.1. Purpose

The GitHub repository monitoring tool will help the teaching assistants to monitor and grade each groups and students; by analyzing a repository and showing useful information in an easy-to-use and easy-to-understand way. In summary, this will show the contributions of each students and the progress of the project.

### 1.2. Scope

The purpose of the project is to develop a web application for activity tracking on GitHub. The software will transform the information available on the GitHub database into a graphical interface.

### 1.3. References

1. GitHub - https://github.com
2. Vision Document Template

## 2. Positioning

### 2.1. Problem statement


|---                             |---                                    |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Problem                 | difficulty to track student activity and contribution in each project on GitHub. A lot of useful information is located on different pages and it is hard to remember all of it to make an analys.                                                                                           |
| Affects                        | TA                                                                                                                                                                          |
| Impact         | hard to make quick analysis about students activity and contribution to the projects. Hard to track project evolution                                                       |
| Solution | web-based application that collects all necessary data from GitHub and represents it in one place for further analysis. Data can be displayed in different types of charts. |


### 2.2. Product position statement


| ---                         | ---                                                                                                    |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| For                         |  TA                                                                                                    |
| Who                         |have difficulties with assessment of student's contribution and activity in project on GitHub           |                                                                                 |
| What                        |collects data from GitHub and demonstrates it in convinient for futher analysis way                     |
| Unlike                      |GitHub, which doesn't have enough tools to represent data for tracking a single student's activity or the project's progress|
| Our product                 |provides user a simple method to view all neccessary and addintional data from GitHub repository. It is done with different charts|                                                                                                           


## 3. Stakeholder Descriptions


### 3.1. Stakeholder Summary
| Name         | Description                 | Responsibilities                                          |
|--------------|-----------------------------|-----------------------------------------------------------|
|  TA          |A client, who is supposed to  use this application in the future |This stakeholder needs to check the progress of the project during each iteration. Coordinates each iteration with developers.|
                     
                                                                                     

## 4. Product features

### 4.1. System features
1. Login into github account (through github API)
2. Logout from github account (through github API)
3. Add repository to his own page
4. Delete repository from his own page
5. Add description to repository
6. Edit description of repository
7. Taking notes and grading students

### 4.2. User features
1. Get activity of repository
2. Get average number of commits for each teammate
3. Get list of issues for repository
4. Get list active issues for repository
5. Get list of closed issues for repository
6. Get list of all commits for repository
7. Get list of students and the ability to follow each one of them
