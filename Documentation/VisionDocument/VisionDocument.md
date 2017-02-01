# Vision Document

GitHub repository monitoring tool.


## 1. Introduction

### 1.1. Purpose

The purpose of this document is to describe the need and to define features of the GitHub repository monitoring tool.

### 1.2. Scope

The purpose of the project is to develop an application for activity tracking on GitHub. This work will help the TA (teacher assistant) to assess student contribution to the project in easy way.

### 1.3. References

1. GitHub - https://github.com
2. Vision Document Template

## 2. Positioning

### 2.1. Problem statement


|---                             |---                                    |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The problem of                 | difficulty to track student activity and contribution in each project on GitHub. A lot of useful information is located on different pages and it is hard to remember all of it to make an analys.                                                                                           |
| affects                        | TA                                                                                                                                                                          |
| the impact of which is         | hard to make quick analysis about students activity and contribution to the projects. Hard to track project evolution                                                       |
| a successful solution would be | web-based application that collects all necessary data from GitHub and represents it in one place for further analysis. Data can be displayed in different types of charts. |


### 2.2. Product position statement


| ---                         | ---                                                                                                    |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| For                         |  TA                                                                                                    |
| Who                         |have difficulties with assessment of student's contribution and activity in project on GitHub           |
| GitHub repo monitoring tool |is an application                                                                                       |
| That                        |collects data from GitHub and demonstrates it in convinient for futher analysis way                     |
| Unlike                      |GitHub, which doesn't have enough tools to represent data for tracking students activity or project progress|
| Our product                 |provides user a simple method to view all neccessary and addintional data from GitHub repository. It is done with different charts|                                                                                                           


## 3. Stakeholder Descriptions


### 3.1. Stakeholder Summary
| Name         | Description                 | Responsibilities                                          |
|--------------|-----------------------------|-----------------------------------------------------------|
|  TA          |A client, who is supposed to  use this application in the future |This stakeholder needs to check the progress of the project during each iteration. Coordinates each iteration with developers.|
                     
                                                                                     

## 4. Product features

### 4.1. System features
1. Login into github account (through github API)
2. Logout from guthub account (through github API)
3. Add repository to his own page
4. Delete repository from his own page
5. Add description to repository
6. Edit description of repository
7. ...

### 4.2. User features
1. Get activity of repository
2. Get average number of commits for each teammate
3. Get list of issues for repository
4. Get list active issues for repository
5. Get list of closed issues for repository
6. Get list of all commits for repository
7. ...
