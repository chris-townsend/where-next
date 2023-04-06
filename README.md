# Where next

Where Next is a full-stack project built using JavaScript and CSS. The goal is to create a functional and responsive website that enables users to create and share posts. The website will have full CRUD functionality, allowing users to edit and delete their posts. Each post page will have a comments section and options to like and bookmark posts to a bookmarks page. The website should follow UX design principles, and is accessible and easy to navigate, allowing users to find information and resources intuitively.

![Am i responsive]()

The live link can be found here - [Where next](https://where-next-social.herokuapp.com/)

*Please note: To open any external links in a new browser tab, please press **CTRL + Click***

## Contents

- [Where next](#where-next)
  * [User Experience (UX)](#user-experience-ux)
    + [Epics](#epics)
    + [User Stories](#user-stories)
      - [Future Stories](#user-stories-not-yet-implemented)
    + [Design](#design)
      - [Wireframes](#wireframes)
      - [Colour Scheme](#colour-scheme)
      - [Imagery](#imagery)
      - [Typography](#typography)
  * [Agile Methodology](#agile-methodology)
  * [Data Model](#data-model)
  * [Security Features](#security-features-and-defensive-design)
    + [User Authentication](#user-authentication)
    + [Form Validation](#form-validation)
    + [Database Security](#database-security)
  * [Features](#features)
    - [Features Left to Implement](#future-features)
    - [Languages Used](#languages-used)
  - [Technologies Used](#programs-frameworks--libraries-used)
    - [Programs](#programs)
    - [Frameworks](#frameworks)
    - [Libraries](#libraries)
  * [Testing](#testing)
  - [Development](#development)
    - [GitHub](#github)
    - [React](#react)
  * [Deployment](#deployment)
    - [Heroku](#heroku)
    - [ElephantSQL](#elephant-sql)
    - [Forking the GitHub Repository](#forking-the-github-repository)
    - [Making a local clone](#cloning-this-repository)
  * [Credits](#credits)
    + [Content](#content)
    + [Media](#media)
  * [Acknowledgements](#acknowledgements)

***

## User Experience (UX)

The target audience for Where next

### Epics 

5 Epics were created as Milestones which were then further developed into - User Stories. The details on each epic, along with the user stories linked to each one can be found [here](https://github.com/chris-townsend/where-next/milestones).


[EPIC 1]() **-**

[EPIC 2]() **-**

[EPIC 3]() **-**

[EPIC 4]() **-**

[EPIC 5]() **-**

[EPIC 6]() **-**


#

### User Stories


#### EPIC | ****


#

#### EPIC | ****


#

#### EPIC | 

#

#### EPIC | Navigation

#

#### EPIC | 

#

#### EPIC | 


# 

#### User stories not yet implemented

The following user stories were scoped out of the project due to time constraints and its intended that these user stories will be implemented at a later date. 

[Back to top ⇧](#where-next)

***

### Design

The website was designed with a minimalistic style to align with the site's objectives. The simple design allows users to easily navigate through the site and find what they are looking for.

***

#### Wireframes

Initial wireframes were created for the original ideas, and as functionality was scaled back, these wireframes have also served as guidelines for the more basic features that remain in place for future development. The wireframes were designed using Balsamiq, with a mobile-first approach in mind.

*Please note that to view the wireframe images, you need to click on the arrow next to each title.*

#### ***Mobile***

<details>

 <summary>Homepage</summary>

![Mobile - Homepage]()
</details>

<details>

 <summary>Feed</summary>

![Mobile - Recipes]()
</details>

<details>

 <summary>Liked Posts</summary>

![Mobile - Liked Posts]()
</details>

<details>

 <summary>Post Detail for the <i>author</i></summary>

![Mobile - Post Detail for the author]()
</details>

<details>

 <summary>Post Detail for the <i>comment author</i></summary>

![Mobile - Post Detail for the comment author]()
</details>

<details>

 <summary>My Bookmarked Posts</summary>

![Mobile - My Bookmarked Posts]()
</details>

<details>

 <summary>Add Post</summary>

![Mobile - Add Post]()
</details>

<details>

 <summary>Update Post</summary>

![Mobile - Update Post]()
</details>

<details>

 <summary>Delete Post</summary>

![Mobile - Delete Post]()
</details>

<details>

 <summary>Search Post</summary>

![Mobile - Search Post]()
</details>

# 

#### ***Desktop***

<details>

 <summary>Homepage</summary>

![Desktop - Homepage]()
</details>

<details>

<details>

<summary>Post Detail</summary>

![Desktop - Post detail]()
</details>


<br>

***

#### Colour Scheme

A light colour scheme was chosen to provide good contrast with the text and create a clean and visually pleasing look throughout the site. Careful consideration was given during the design process to establish a strong contrast between background colours and text, and to ensure that the site meets accessibility requirements.

![Colour Palette]()
*Colour palette from* [*Coolors*](https://coolors.co/)

***

#### Imagery

The imagery used throughout the site is intended to inspire users to travel and share places, and all the static images are sourced from either [Pexels](https://www.pexels.com/) or [Unsplash](https://unsplash.com/), which are both royalty-free. A list of images used is available in the credits section.

***

#### Typography 

When selecting typefaces for the site, I aimed to choose fonts that evoke a relaxing and elegant theme, for easy reading and complement the overall feel and style of the site. One of the fonts used on the homepage, "Italiana," has a cursive style that adds elegance and sophistication to the site, while still being easy to read. All fonts are from Google fonts, which can be imported from their API and provide wide coverage to maintain consistent styling across various devices. A backup font, "Sans Serif," was also selected in case the primary font is not imported correctly.

**Headings:** *''*

![]()
![]()


**Body:** *''*

![Font]()


***

## Agile Methodology

GitHub projects were used to manage the development process using an agile approach. To view the project kanban board, please click on the link [here](https://github.com/users/chris-townsend/projects/7/views/1)
![GitHub kanban board]()

A GitHub Issue was created for each User Story, which was then allocated to a milestone (Epic). Each User Story has defined acceptance criteria to make it clear when the User Story has been completed. The acceptance criteria are further broken down into tasks to facilitate the User Story's execution. The issues were closed automatically when the pull request was linked to the issue, most of them were closed automatically but some were closed manually.

![Guthub kanban board future features]()

***

## Data Model

![Database Schema]()

*Database schema from [drawSQL](https://drawsql.app/)*


## Security Features and Defensive Design

### User Authentication


### Form Validation

A warning message will appear to the user when inaccurate or empty data is entered into a form, identifying the specific field that caused the issue. This prevents the form from being submitted until the issue is resolved, ensuring that only accurate and complete data is processed.

### Database Security


[Back to top ⇧](#kitchen-tales)

***

## Features

### Header

**Logo**

- A customised logo was created using [Logo.com](https://logo.com/) by  which is a free logo generator.

![Where next logo]()

- The logo is prominently positioned in the top-left corner of the navigation bar. It is linked to the homepage to make it easy for users to navigate back to the main page of the website.

**Navigation Bar**


#### *User is not logged in Navbar*

![Navigation section]()

![Navigation section unauthorized]()

#### *User logged-in Navbar*


![]()

![]()

### Home Page

![Homepage]()


### Newsletter Page

### User Account Pages

**Sign Up**

![Register form]()

**Log In**

![Login section]()


**Log Out**

![Logout section]()


### Post Detail Page


**Post Action Buttons**
![Post action buttons]()

- On the post detail page, if the logged-in user is the owner of the post, they will have the option to edit or delete the post by the presence of a menu which consists of an edit and delete icon.

**Post Detail Page**
![]()
![]()

**Comments Section**
![]()
![]()


### Update Comment
![]()

### Delete Comment
![]()

### Add Post Form
![]()

### Update Post Form
![]()

![]()

### Delete Post
![]()

### My Feed Page
![]()


### My Bookmarks Page
![]()

- The Bookmarks page displays a user's collection of bookmarked posts, easily identified by a shining star icon on the recipe detail page. By simply clicking the star icon, a recipe can be saved to the user's personal Bookmarks page. The layout of this page is consistent with the other post pages, with the added convenience of Infinitescroll feature being able to browse through eigh

### Error Page

- ***404** Page Not Found* - The page you're trying to access doesn't exist.
![]()


***

### Future Features

In the future, there are several functionalities that I would like to implement. I have left the initial user stories that were created in the project kanban board as potential areas for future improvement and these have been left in the [Future Features](https://github.com/users/chris-townsend/projects/7/views/1) section of the kanban board. The key areas I would like to add to the site include:


- [#3](https://github.com/chris-townsend/where-next/issues/3) The ability for users to log in via social networks such as Facebook or Google.

- [#24](https://github.com/chris-townsend/where-next/issues/24) The option to print a post.

***

## Languages Used

  [![Javascript](https://img.shields.io/badge/javascript-3670A0?style=for-the-badge&logo=javascript&logoColor=ffdd54)](https://en.wikipedia.org/wiki/Python_(programming_language))

  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://en.wikipedia.org/wiki/CSS)

***

## Programs, Frameworks & Libraries Used

### Programs

[**Balsamiq**](https://balsamiq.com/) - Balsamiq was used to create the basic wireframes during the design process.

[**Pixlr**](https://pixlr.com/x/) - Pixlr was used to resize and change the format of my images.

[**Google DevTools**](https://developer.chrome.com/docs/devtools/) - Once the website was made to a basic deployment level, Google DevTools was used frequently

[**Git**](https://git-scm.com/) - Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.

[**GitHub**](https://github.com/) - GitHub is used to store the project's code after being pushed from Git.

[**Heroku**](http://heroku.com/) - Heroku is a cloud platform that lets people build, deliver, monitor, and scale apps. It supports several programming languages. Heroku was used for the deployment of this project.

[**W3C Markup Validator**](https://validator.w3.org/) - 

[**Favicon Generator**](https://favicon.io/favicon-converter/) - This was used to create my favicon icon. 

[**JSHint Validator**](https://jshint.com/) - Jshint was used to validate the JavaScript code. It shows any warnings and errors within my code. 

[**Cloudinary**](https://imgpile.com/) - A cloud hosting website, used for hosting my images.

[**DrawSQL**](https://drawsql.app/) - DrawSQL is a database diagram tool which was used to visualize relationship diagrams for my databases.

***

### Frameworks

[**React**](https://react.dev/) - React allows you to build user interfaces out of individual pieces called components. React components are JavaScript functions.

***

### Libraries 

[**React Bootstrap 4.6**](https://react-bootstrap-v4.netlify.app/) - React Bootstrap provides a popular framework for building responsive mobile-first sites with built-in CSS & Javascript libraries.


[]() -

***

# Testing

Testing and results can be found [here](/TESTING.md)

***

# Development

This site was made using [GitHub](#github) & [Gitpod](https://www.gitpod.io/). The site was further developed using [Django](#django), a Python web framework.

## GitHub

### Create the repository

1. Sign in to GitHub and click the 'New' button at the top of the page------[Code Institute's Gitpod template](https://github.com/Code-Institute-Org/gitpod-full-template).
![GitHub Code Institute template](docs/development/github/github-use-this-template.webp)
 - At the top of the repository, click **Use this template** followed by **Create a new repository**.
 ![GitHub Code Institute template](docs/development/github/github-create-new-repository.webp)

*Alternatively:*

1. Click the GitHub label in the top left of the nav section.
![GitHub create repository](docs/development/github/github-label.webp)

2. Select **New** next to **Top Repositories**.     
![GitHub click new repository](docs/development/github/github-new.webp)

3. Select the **template** you wish to use.                
![GitHub select template](docs/development/github/github-select-template.webp)

4. Give the repository a name and description and then click **Create repository**.
![GitHub create repository](docs/development/github/github-create-repository.webp)

The repository has now been created and is ready for editing through the Gitpod terminal.
 
***

[Back to top ⇧](#where-next)

## React


***

[Back to top ⇧](#where-next)

# Deployment

## Heroku

To deploy this page to Heroku from its GitHub repository, the following steps were taken:

### Create the Heroku App:
#

1. Log in to [Heroku](https://dashboard.heroku.com/apps) or create an account.
![Heroku Signup](docs/deployment/heroku/heroku-signup.webp)

2. On your Heroku dashboard, click the button labelled **New** in the top right corner and from the drop-down menu select **Create new app**.
![Heroku Dashboard](docs/deployment/heroku/heroku-dashboard.webp)
![Create new app](docs/deployment/heroku/heroku-create-app.webp)

3. Enter a **unique and meaningful app name** and **choose the region** which is best suited to your location.
![Meaningful app-name](docs/deployment/heroku/heroku-meaningful-name.webp)
- Click on the **Create app** button.

4. Select **Settings** from the tabs at the top of the app page.
![Heroku app settings](docs/deployment/heroku/heroku-dashboard-settings.webp)

5. Click **Reveal Config Vars**.    
![Heroku app settings](docs/testing/user-testing/heroku-config-vars.webp)

6. Input all key-value pairs from the `env.py` file. Ensure `DEBUG` and `DISABLE_COLLECTSTATIC` are not included in the final production.
![Heroku app settings](docs/testing/user-testing/heroku-config-var-setup.webp)

| KEY | VALUE |
| --- | --- |
|``DATABASE_URL``|=  ``****``  |
|``SECRET_KEY``  |=  ``****``  |
|``CLOUDINARY_URL`` |=  ``****``  |
|``PORT``  |= `8000` |
|``DISABLE_COLLECTSTATIC``  |=  ``1`` |


7. Below your Config Vars in your app settings, click **Add build pack**.
![Heroku add buildpack](docs/deployment/heroku/heroku-add-buildpack.webp)

8. Select **Python** from the list of build packs.
![Heroku select buildpack](docs/deployment/heroku/heroku-select-buildpack.webp)
- Remember to click **Save changes**.

9. Select **Deploy** from the tabs at the top of the app page.
![Heroku deploy](docs/deployment/heroku/heroku-deploy.webp)

10. Select **Connect to GitHub** from the deployment methods.
![Heroku deployment method](docs/testing/user-testing/heroku-deployment-method.webp)

11. Search for the repository to connect to by name.
![Heroku select repository](docs/deployment/heroku/heroku-select-repository.webp)

12. Click **Connect**.
![Heroku click connect](docs/deployment/heroku/heroku-connect-to-github.webp)

 - Your app should now be connected to your GitHub account.

![Heroku connected app](docs/testing/user-testing/heroku-connected-app.webp)

 13. Select **Enable Automatic Deploys** for automatic deployments.

![Heroku automatic deploy](docs/deployment/heroku/heroku-automatic-deploys.webp)

- If you would like to deploy manually, select **Deploy Branch**. If you manually deploy, you will need to re-deploy each time the repository is updated.

![Heroku manual deploy](docs/deployment/heroku/heroku-manual-deploy.webp)

- For the first time deploying to Heroku, you may have to deploy manually but if you select automatic deploys it will update from then onwards.

14. Click **View** to view the deployed site.
![Heroku successful deploy](docs/deployment/heroku/heroku-successful-deploy.webp)

***

### Create & attach the Elephant SQL database

1. Log in to [ElephantSQL](https://customer.elephantsql.com/instance#) to access your dashboard.
![Elephant SQL dashboard](docs/deployment/elephant-sql/elephant-sql-dashboard.webp)

2. Click **Create New Instance** at the top right of the page.        
![Elephant SQL new instance](docs/deployment/elephant-sql/elephant-create-new-instance.webp)

3. Set up your **plan**.
- Give your plan a **Name** (this is commonly the name of the project)
- Select the **Tiny Turtle (Free)** plan
- You can leave the **Tags** field blank

![Elephant SQL setup plan](docs/deployment/elephant-sql/elephant-setup-plan.webp)

4. Click **Select Region**.        
![Elephant SQL select region](docs/deployment/elephant-sql/elephant-select-region.webp)

5. Select a **data centre** near you.
![Elephant SQL select data center](docs/deployment/elephant-sql/elephant-select-data-center.webp)

6. Click **Review**.                 
![Elephant SQL review data center](docs/deployment/elephant-sql/elephant-review-data.webp)

7. Ensure your details are correct and then click **Create instance**.
![Elephant SQL confirm instance](docs/deployment/elephant-sql/elephant-confirm-instance.webp)

8. Return to the **ElephantSQL dashboard** and you should see your **database instance name** for this project.
![Elephant SQL dashboard instance](docs/deployment/elephant-sql/elephant-dashboard-instance.webp)

9. On your **ElephantSQL dashboard**, click on the **database instance name** for this project.  
![Elephant SQL click instance](docs/deployment/elephant-sql/elephant-click-instance.webp)

10. In the **URL section**, click the **copy icon** to copy the **database URL**.
![Elephant SQL copy URL](docs/deployment/elephant-sql/elephant-copy-url.webp)

11. Within your **Heroku app**, add `DATABASE_URL` as the `KEY` and paste the URL you just copied in **ElephantSQL** into the `VALUE` column. Your **ElephantSQL** database should now be connected to your **Heroku** app.
![Elephant SQL add database URL ](docs/deployment/elephant-sql/elephant-add-database-url.webp)

***

### Forking the GitHub Repository

By forking the GitHub Repository you can make a copy of the original repository. You can view and/or make changes without affecting the original repository by using the following steps...

**1.** Log in to GitHub and locate the [GitHub Repository](https://github.com/) you would like to fork.

![GitHub Repository](docs/deployment/github/github-select-repository.webp)

**2.** At the top of the Repository, just above the **Tabs**, locate the **Fork** Button and you should now have a copy of the repository in your account.

![GitHub Fork](docs/deployment/github/github-fork-repository.webp)

***

### Cloning this repository

**1.** Log in to GitHub and locate the [GitHub Repository](https://github.com/).
![GitHub Repository](docs/deployment/github/github-select-repository.webp)

**2.** On the repository main page, click the drop-down menu called Code.

![GitHub Code Drowndown menu](docs/deployment/github/github-clone-repository.webp)

**3.** To clone the repository using HTTPS, copy the link.

![GitHub copy URL](docs/deployment/github/github-copy-url.webp)

**4.** Open Git Bash

**5.** Change the current working directory to the location where you want the cloned directory to be made.

**6.** Type `git clone`, and then paste the URL you copied in Step 3.

**7.** Press Enter. Your local clone will be created.

***

## Credits

### Content 

- [Django REST framework docs](https://www.django-rest-framework.org/)

- [React Bootstrap 4.6 docs](https://react-bootstrap-v4.netlify.app/)

- [Code Institute - *'Moments'* walkthrough project](https://github.com/Code-Institute-Solutions/moments)

- [-]()

#

### Media

- Photo by *-*:

- Photo by *-*: 

- Photo by *-*:

- Photo by *-*: 

***

## Acknowledgements


<br>

[Back to top ⇧](#where-next)