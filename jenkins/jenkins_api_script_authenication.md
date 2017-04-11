Without enabling anonymous user logins for the jenkins server, just calling the jenkins api in a script will not work e.g.

       curl http://jenkins01.mediacorp.sg:8080/job/cache-warmup/build?token=TOKEN_NAME

Jenkins requires some form of authenication before allowing this api to be executed.

The easiest way to do this, is to create a user account for this job at Jenkins and call the api this way:

       curl http://user1:user1_password@http://jenkins01:8080/job/cache-warmup/build?token=TOKEN_NAME


But this is not recommended because this leaks the password of the user account. So the recommended way is to use the “API token” of the user.
This API token can be retrieve from the user’s account configuration page. There’s a “Show API Token…” button.

Then the jenkin api can be called this way from a script:

       curl http://user1:user1_api_token@http://jenkins01:8080/job/cache-warmup/build?token=TOKEN_NAME


Other info

Calling the api via a web browser and via curl can be behave differently.
If you have already logged into the jenkins server at a web browser and you call the Jenkins job api (without the user and passoword or api token) with the same browser, the job will run.
If you were logged out of Jenkins, calling the job api with the web browser, cause the page to be redirected to the Jenkins login pages (or Github login page for our case).
I think this is because the login session is stored somewhere in the browser.

Using curl (or wget) will always require the user name and password (or api token).
