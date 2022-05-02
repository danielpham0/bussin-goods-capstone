# Bussin’ Goods Handoff Documentation
    Project Continuing as an Open Source Project

## Notify Stakeholders:
    Relevant Stakeholders:
        Dan Sedlacek (des47@uw.edu) - UW Entrepreneurship Capstone Professor
        Tinker Tim, Covid Corgis, Doces Brasileiros - UW Entrepreneurship Startup Groups

        Date of Transition: June 10th, 2022

## Post a Notice:
    Landing Page Note: “Hello! This is a notice on the status of the Bussin’ Goods project. This site will be handed off and transitioned to open source effective June 10th, 2022.”
    Shut Down Systems, Notify Users about Data Deletion, Delete All Collected Data:
    All of the data collected thus far has been test data and can be easily deleted once our project has fully transitioned by deleting the MongoDB collection.

## Shut down all cloud infrastructure:
    Delete and Shutdown:
    - MongoDB Database
    - Stripe Account
    - NGROK Account
    - AWS Cognito
    - AWS S3 Bucket
    - Heroku Hosted Backend
    - Netlify Hosted Frontend

## Convert the code repository:
    The repository is already public at the following link: https://github.com/danielpham0/bussin-goods-capstone
    README Document:
    Will be available at the following link:
    https://github.com/danielpham0/bussin-goods-capstone/blob/main/README.md

# Project Description & Purpose
    Bussin' Goods will be an e-commerce platform that start-ups can use to share their story and products. Our goal is to assist UW Foster's Entrepreneurship Program by building a platform for its student projects.
    Since our problem stems from the fact that start-ups often do not have the same resources in comparison to larger businesses, we are hoping to provide a place for entrepreneurs to pursue their goal and have the support they need. As an information problem, we aim to provide a space for aspiring entrepreneurs to cultivate and grow their businesses and ideas with resources and support in order to assist in the growth of ideas. Not knowing the next steps or feeling lost can occur when being a startup, and this lack of resources and information is what we aim to help with. We want to provide a platform and community that allows anyone to prosper and grow their ideas into a reality. Specifically for the students in the entrepreneurship program, we hope to provide a community and to let underrepresented ideas prosper and create a space for diversity and growth.

# Research and Design Documentation
    Bussin’ Goods is a MERN Stack Web Application coded completely in React, Javascript, HTML/CSS. Special thanks to Brad Traversy, as our starter code comes from his [React-Express Starter] (https://github.com/bradtraversy/react_express_starter) template which is licensed under the MIT License. We then integrated standard express routing so that our application can be more modular.

## Server runs on http://localhost:3001 and client on http://localhost:3000
 
### Install dependencies for server
npm install
 
### Install dependencies for client
npm run client-install
 
### Run the Express server only
npm run server
 
### Run the React client only
npm run client
 
### Run the client & server with concurrently
npm run dev

The UI was originally created through Figma, drawing inspiration from neighboring e-commerce websites including Amazon, Etsy, Croftery, etc. Relevant embedded images and icons are linked within the source code.
    The back-end cloud infrastructure consists of the following:
    - MongoDB Database
    - Stripe Account
    - NGROK Account
    - AWS Cognito
    - AWS S3 Bucket
    - Heroku Hosted Backend
    - Netlify Hosted Frontend
    More information regarding setting these up are provided below.
    For more information, you can contact us at the following email: daniep7@uw.edu. 

# SETTING UP CLOUD INFRASTRUCTURE/ACCOUNTS

## SETTING UP YOUR .env FILE
    1.Create a new file named ‘.env’ which will contain all of your important environmental variables for the backend. This file will reside in the root directory of the repository.
    2. The following is a template for how your .env file should look.
        MONGODB_URI = <MongoDB Connection String>
        SESSIONS_SECRET = <Any Random String>
        STRIPE_SK = <Stripe Secret Key>
        STRIPE_WH = <Stripe Webhook Key>
        NGROK_TOKEN = <Ngrok API Key>

        COGNITO_USER_POOL= <Cognito Pool Id>
        COGNITO_CLIENT= <Cognito App Client Id>
        S3_REGION = <S3 Bucket Region>
        S3_BUCKET_NAME = <S3 Bucket Name>
        S3_ACCESS_KEY_ID = <User with S3 Bucket Permissions Access Key>
        S3_SECRET_ACCESS_KEY =  <User with S3 Bucket Permissions Secret Access Key>


## SETTING UP AWS COGNITO (https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
    Purpose: Helps us manage User Accounts and Account Verification
        1. Create an AWS Account and log into the dashboard
        2. Navigate to Amazon Cognito and create a User Pool
        3. Step through and adjust settings according to your preferences (primarily you just need to change Attributes, Policies, and Message Customizations). For attributes check email as a required attribute. For Message Customizations change it to link email verification.
        4. Once you have created your pool, add the Pool Id as your COGNITO_USER_POOL in the .env file.
        5. Under App Integration’s Domain name category, add a domain prefix.
        6. Under App Clients, add a new App Client and uncheck generate client secret.
        7. Once you have created it, add the App Client Id to your .env file as COGNITO_CLIENT
        8. Input your Cognito region and userPoolId into the following link: https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
        9. Save the jwks.json file and save it to the root directory.

## SETTING UP AWS S3 (https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
    Purpose: Helps us store and retrieve files, like images
        1. Create an AWS Account and log into the dashboard
        2. Navigate to https://s3.console.aws.amazon.com/s3/get-started?region=us-west-2
        3. Create a bucket
        4. Copy the AWS region to your .env file as S3_REGION (most likely just us-west-2), and copy the Bucket Name to your .env file as S3_BUCKET_NAME
        5. Navigate to Permissions and then Bucket policy
        6. Click Policy Generator and Create a S3 Bucket Policy
            a. Principal=*
            b. Actions=getObject
            c. ARN=arn:aws:s3:::<YOUR_BUCKET_NAME>/*
        7. Generate Policy and then copy paste into your Bucket Policy
        8. In the same subsection, update CORS to be the following:
            a. [ { "AllowedHeaders": [ "*" ], "AllowedMethods": [ "GET", "PUT", "HEAD" ], "AllowedOrigins": [ “*" ], "ExposeHeaders": [] } ]
        9. Go back to the dashboard and go to AWS IAM
        10. Create a policy under the S3 Service
            a. Add an action under the access level Write: PutObject
            b. Add the following ARN for Resources ‘arn:aws:s3:::{YOUR_BUCKET_NAME}/*’
            c. Continue and then create the policy with your selected policy name
        11. Create an IAM User
            a. Select Access key - Programmatic access for AWS Credential type
            b. Attach existing policies directly, and then select the policy you just created
            c. Then finish creating the user
            d. Copy the Access key ID to your .env file as S3_ACCESS_KEY_ID and the Secret Access Key ID as S3_SECRET_ACCESS_KEY

## SETTING UP MONGODB (https://www.mongodb.com/basics/mongodb-atlas-tutorial)
    Purpose: Serves as our database
        1. Sign-up for a MongoDB Account and Log in
        2. Create a Shared Cluster (Use AWS and US-West-2) with your own Cluster Name
        3. Create a user to authenticate your connection
        4. Go to your Deployments and click the Connect button on your provisioned Cluster
        5. Add the IP Address 0.0.0.0/0 to the allowed connections
        6. Click ‘Connect your application’ (Make sure that Node.js is the selected Driver)
        7. Copy the Connection String and add it to your .env file for MONGODB_URI

## SETTING UP NGROK
    Purpose: Gives us a public URL that reflects our localhost, which is necessary for Stripe’s Webhooks
        1. Sign-up for a Ngrok Account and Log in
        2. Verify your account
        3. Copy the Auth Token here https://dashboard.ngrok.com/get-started/your-authtoken and add it to your .env file as NGROK_TOKEN

## SETTING UP STRIPE (https://stripe.com/docs/connect)
    Purpose: Handles all payment information
        1. Sign-up for a Stripe Account
        2. Activate the account https://dashboard.stripe.com/account/onboarding/
        3. Navigate to the Connect Tab
        4. Click ’Get Started’ and choose the ‘Marketplace’ option
        5. Complete your Platform Profile
        6. Navigate to Connect Settings, and select Test Mode https://dashboard.stripe.com/settings/connect
        7. Fill in the Branding section of the Connect Settings, and turn on OAuth settings for both types of accounts (Express, Standard)
        8. Add a redirect URI to ‘http://localhost:3000/StoreDashboard’ and your final production URI
        9. Add the Secret API Key from the following link to your .env file and add the Publishable API Key to the front end as STRIPE_PK in CheckoutPage.js https://dashboard.stripe.com/test/apikeys
        10. Add Webhook for https://bussin-goods.herokuapp.com/ or the Ngrok URL that is provided when not in production. For this webhook, make sure to check off “Listen to events on Connected accounts”.
        11. Also add the Webhook Key displayed here while setting up.

## SETTING UP HEROKU (https://devcenter.heroku.com/articles/git)
    Purpose: Hosts both our front-end and back-end, temporary until ready for production deployment
        1. Sign-up for a Heroku Account
        2. Install the Heroku CLI https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli
        3. In your Terminal at the root directory of our repository run:
            a.‘heroku login’
            b.‘heroku create’
            c.‘heroku git:remote -a bussin-goods’
            d.‘git add .’
            e.‘git commit -am "make it better"’
            f.‘git push heroku main’
        4. In the Heroku Web Dashboard, go to your Settings tab, and add all of the config variables that we previously set up with our .env file.

## Future To-do’s
        1. Integrate Google Analytics or Create analytics from order history
        2. Create Admin capabilities so that they can view requests to become store owners and manage those requests
        3. Integrate email services in order to track receipts
        4. Order history and tracking from both sides
        5. Flesh out Management of Store
        6. Profile pictures for the store and users
        7. Error handling for when user’s accessToken gets expired & other miscellaneous error handling
