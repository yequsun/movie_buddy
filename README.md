# Movie Buddy

Movie Buddy is a web app that brings people together to watch movies.
Going to the movie alone is somehow embarrassing these days. And I created Movie Buddy to solve this problem.

[Video Demo](https://www.youtube.com/watch?v=UXNM1gMFwkI&feature=youtu.be)

## Interactions

Users can post and respond to movie invitations. 
Powering by external apis, Movie Buddy can search all movie showtimes near the user's zipcode.

## Frameworks

•Front End: React.JS

•Back End: AWS Amplify

•APIs: Express.JS

•UI Elements: Bootstrap, Semantic UI

## Storage

•User Info – Cognito

•Posts and Replies – DynamoDB

•Hosting and Deployment – S3
## Internal APIs

•Publish New Post

•Publish New Reply

•Accept A Reply

•Get Posts of a Certain User

•Get Replies Published by a Certain User

•Get Replies Received by a Certain User

•Get Latest Playing Movies and Posters

•Send Email Notification

## External APIs and Data Sources

•OnConnect: Detailed Movie Showtime. http://developer.tmsapi.com/


•TheMovieDB.org: Now Playing, Movie Posters

## Project Architecture
This Amplify + React.JS application utilizes AWS's serverless architecture.
![Diagram](https://i.imgur.com/CUV9ThX.png)
##
### Details
Front end: Users connect to the front end via Cognito authentication.

Hosting and Deployment: Thanks to Amplify library, this project has two S3 buckets. The first one is for the actual static file hosting. The other one serves as a development storage.

APIs and Requests: All requests are handled by API Gateway with authentication. It redirects data flow between DynamoDB and external API sources.