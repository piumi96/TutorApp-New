# Routes

## Admin Dashboard
### get /adminDash
output: json Tutorcount, Studentcount, Msgcount

## Block
### put /block
input: role, email

output: json success: true/ false

### put /unblock
input: role, email

output: json success: true/false

## Districts
### get /districtCount
output: Tcount array, Scount array

## Rates
### post /rate
input: rate, tutor. student

output: json success: true/false, rating, allowed: true/false

## Requests
### get /viewMyRequests
input: student

output: request array

id, tutor, sent_date, day, location, subject, status

### get /viewRequest
view full details of 1 particular request
input: id

output: request array

id, tutor, sent_date, day, location, subject, status

### put /acceptRequest
input: id

output: json success: true/false

### put /rejectRequest
input: id

output: json success: true/false

### delete /cancelRequest
input: id

output: json success: true/false

## Reviews
### post /writeReview
input: student, tutor, content

output: review array

date, tutor, student, content

### get /myReviews
input: tutor

output: review array

date, tutor, student, content

## Subjects
### get /subjectCount
output: count array
array index from 1-n => count of tutors teaching subject of ID 1-n

## Suggestions
### get /viewAllSuggestions
output: suggestions array

ID, Sender, Date, Content

### get /mySuggestions
input:  email

output: suggestions array

ID, Sender, Date, Content

### post /makeSuggestion
input: email, content

output: json 
success: true/false




