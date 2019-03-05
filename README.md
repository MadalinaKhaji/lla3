# Language Learning Appplication 3.0 - lla3
MEAN Application with a focus on word management.

## Table of Contents
* [Introduction](#introduction)
* [Short History](#short-history)
* [Technologies](#technologies)
* [API](#api)
* [License](#license)

## Introduction 
The purpose of this project is to serve as a tool for remembering your vocabulary when you are learning a foreign language. It encourages users to separate the words they know into different categories. To find out more, you can check out the files in the documentation folder.

## Short History 
Initially, LLA 1.0 was one of my school projects. This was my fist time working with the MEAN stack and I had an especially rough experience with learning Angular. After finally mastering a bit of Angular, I came to the conclusion that the Angular frontend I built for version 1 was simply put unsightly to even look at. I decided to start over and so LLA 2.0 came about. LLA 2.0 was a definite improvement over the previous version but it was still lacking in many ways. I was still interested in both building an application of this kind and in working with the MEAN stack, particularly with Angular so I decided to start LLA 3.0. 
Edit: Upon writing this, I realized that I should have just used Git to revert my changes, instead of quitting and starting over and ending up with 3 projects. 

## Technologies 
* Angular
* Bootstrap
* Express.js 
* MongoDB 
* Node.js

## API 
- `/api/words` - Get all words 
- `/api/words/:id` - Get a word with the specified id 
- `/api/words/filter/lang` - Get all languages for all the words
- `/api/words/filter/lang/:language` - Get all words with the specified language 
- `/api/words/filter/lang/cat/:language` - Get all catogories for words with the specifed language 
- `api/words/filter/lang/cat/:language&:category` - Get all words with the specified language and category 
- `/api/words` - Save a new word
- `/api/words/:id` - Update word with specified id 
- `/api/words/:id` - Delete word with specified id 

## License 
This project is licensed under the MIT License - see the LICENSE.md file for details