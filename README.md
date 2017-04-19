# Entrance task 2 for Yandex Mobilization School

This project contains a JS library that provides an API for working with the lectures schedule from the first task. Moreover, a back-end server is written in Golang which deals with the database.

Database used: SQLite.

## Subject area:

The students of Yandex Mobilization School study in several schools and can attend lectures. Lectures are held in classrooms at certain hours and days. Some lectures take part for students of several schools at one time.

Each lecture has its name and a teacher's name. Each school has a name and quantity of students. There's a name, capacity and precise location for every classroom.

## Implements

- viewing school schedules in the specified date range
- viewing the schedule of lectures in the classroom in a specified date range
- inputting and editing of data about the lectures
- inputting and editing of data about schools
- inputting and editing of data about audiences

## Correctness and coherence of data

- for one school there isn't 2 lectures at the same time
- in one classroom there isn't 2 lectures at the same time
- capacity of the classroom must be greater or equal to the number of students in class

## Supported features

- serialization / deserialization in different data formats
- permanent storage of data anywhere
- CLI for maintaining the data