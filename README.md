#Routes

##Suggestions
### get /viewAllSuggestions
output: suggestions array
        ID, Sender, Date, Content

###get /mySuggestions
input:  email
output: suggestions array
        ID, Sender, Date, Content

###post /makeSuggestion
input: email, content
output: json success: true/false


