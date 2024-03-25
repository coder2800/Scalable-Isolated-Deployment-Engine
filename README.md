1. Firstly create a Node.js server which will be a restful server for resolving paths.
2. For each repository deployement, a seperate docker container is created. This helps in creating a seperation of codebases of all the users. Also, this prevents the github repo files from directly coming into source code. (Scalability)
3. The files are cloned inside the /home/app/output folder
4. Now cd into the folder and run npm install and npm run build
5. This creates a /dist folder having static build files.
6. Iterate all files in this folder and ignore any folder as on S3 we are uploading only the files.
7. Now connect to a S3 client.
8. Using a single bucket and all files will have the name -> `__outputs/${PROJECT_ID}/${filePath}`
9. Now upload these static files on the S3 bucket.
10. Deploy this code on AWS ECR after buiding as a docker image.
11. Use of AWS ECS as the container orchestrator -> fargate as the serverless option and EC2 as the managed option. -> containers are actually created in AWS ECS.
12. Now stream(upload) the output in AWS S3 bucket.
13. Now the containers will stop running to save compute.
14. To retrieve the output from S3, use a custom reverse proxy service.
15. Naming -> Node.js server -> API server
    -> Make docker container as the build-server.
16. To map the project to a custom domain like `${PROJECT_ID}.localhost.com` -> set up a reverse proxy server. It displays the files in \_\_outputs/${PROJECT_ID}. This then sends data to the reverse proxy server which then sends the data back to the localhost.

17. Convert my code to docker image and build the image by publishing it on Elastic container registry (similar to docker hub).
18. Now run the docker image by manually triggering a task on ECS (Elastic Compute Service) cluster.
19. This builds the code and copies the static files (For eg - index.html, style.css etc. ) on the AWS S3 bucket.
20. The conssssssssswNow to map the file to a1.localhost:8000 -> we have setup a reverse proxy server to map the requests to that server. This reverse proxy in turn makes a request to the S3 bucket. The files returned from the S3 bucket are returned by the S3 bucket to the client calling the domain address directly without being streamed to the local files.
22. Reverse proxy is running on port 8000.
23. This still leades to problems where a1.localhost:8000/index.html has to be specified. If no file path is specified then it will lead to issues. This is because the browser will try to display the collection of files as a web page.
24. To prevent this, add an event listener to check if a proxy request is received. If received, it should automatically be redirected to a1.localhost:8000/index.html
25. Now creating the API server -> chosen to run over port 9000.
26. Use a post request at port 9000 of the API Server -> if api-server at localhost and at port 9000, then post request at http://localhost:9000/project and specify the gitUrl parameter in the body then, an ECS container is automatically spinned up.