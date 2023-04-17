# Testing

### Contents
- [Testing Stories for UX](#testing-user-stories-from-the-user-experience-ux-section)
- [Validator Testing](#validator-testing)
  * [HTML](#html)
  * [CSS](#css)
  * [Javascript](#javascript)
  * [Lighthouse](#lighthouse)
  * [WAVE accessibility tool](#wave-accessibility-evaluation-tool)
- [Browser Testing](#browser-testing)
- [Device Testing](#device-testing)
  * [Mobile](#mobile)
- [Manual Testing](#manual-testing)
- [Automated Testing](#automated-testing)
- [Bugs](#bugs)
  * [Fixed Bugs](#fixed-bugs)
  * [Unfixed Bugs](#unfixed-bugs)

<br>

*Please note: To open any external links in a new browser tab, please press **CTRL + Click***

***

## Testing User Stories from the User Experience (UX) Section

### EPIC | *Navigation*
<br>

*[As a User, I can access a navigation bar on every page so that I can easily view desired content](https://github.com/chris-townsend/where-next/issues/1)*

**Logged out Navigation** 

![Navigation bar for unauth user](src/docs/testing/user-testing/navigation-logged-out.webp)

**Logged in Navigation**
![Navigation bar for auth user](src/docs/testing/user-testing/navigation-logged-in.webp)
![Side navigation bar for auth user](src/docs/testing/user-testing/side-navigation-logged-in.webp)


*[As a User, I would like to use the app on my mobile, so that I don't have to rely on having my laptop/desktop with me](https://github.com/chris-townsend/where-next/issues/29)*

#

### EPIC | *User Account Mangement*
<br>

*[As a User, I can register for an account so that I can gain access to all the features that are available exclusively to registered users](https://github.com/chris-townsend/where-next/issues/2)*

![Sign up page](src/docs/testing/user-testing/sign-up-page.webp)

*[As a User, I can log into my account so that I can access functionality for logged in users](https://github.com/chris-townsend/where-next/issues/6)*

![Sign in page](src/docs/testing/user-testing/sign-in-page.webp)

*[As a User, I can safely log out of my account so that I can disconnect from the site](https://github.com/chris-townsend/where-next/issues/7)*

![Sign out nav link](src/docs/testing/user-testing/sign-out-nav-link.webp)

![Sign out modal](src/docs/testing/user-testing/sign-out-modal.webp)

*[As a logged-in User, I can see my login status so that I know if I am logged in or out of my account](https://github.com/chris-townsend/where-next/issues/8)*

![nav status](src/docs/testing/user-testing/nav-status.webp)


*[As a logged-in User, I can change my password so that I can keep my account secure](https://github.com/chris-townsend/where-next/issues/11)*

![change password page](src/docs/testing/user-testing/change-password-page.webp)

#

### EPIC | *Posts*
<br>

*[As a user, I can view posts, without having to sign-up to enjoy the site's content](https://github.com/chris-townsend/where-next/issues/4)*

*[As a logged-in User, I can create posts so that I can add content to the site](https://github.com/chris-townsend/where-next/issues/5)*

*[As a logged-in User, I can edit my post so that I can fix or update my existing content](https://github.com/chris-townsend/where-next/issues/12)*

*[As a logged in User, I would like the ability to delete posts so that I can remove any post that I don't want to share](https://github.com/chris-townsend/where-next/issues/13)*

*[As a logged-in User, I want to express my appreciation for posts that interest me by liking them, so that I can engage with the content and show support for the author](https://github.com/chris-townsend/where-next/issues/20)*

*[As a User, I would like to see the newest posts at the top, ordered by most recently created so that I am up to date with the latest content](https://github.com/chris-townsend/where-next/issues/25)*

#

### EPIC | *Comments*
<br>

*[As a User, I can view comments on posts so that I can read other user's feedback](https://github.com/chris-townsend/where-next/issues/9)*

*[As a logged-in User, I want to be able to leave comments on a post, so that I can express my opinions or ideas related to the post](https://github.com/chris-townsend/where-next/issues/18)*

*[As a logged-in User who is the owner of the comment, I can update my comment so that I can fix any mistakes](https://github.com/chris-townsend/where-next/issues/22)*

*[As a logged-in User who is the owner of the comment, I can delete my comment so that I can remove any unwanted comments from the site](https://github.com/chris-townsend/where-next/issues/23)*

*[As a User, I can see the date of when the comment has been published so that I know how old the comment is](https://github.com/chris-townsend/where-next/issues/27)*

#

### EPIC | *Features*
<br>

*[As a User, I can view other user's profiles so that I can see their bio and learn more about them](https://github.com/chris-townsend/where-next/issues/14)*

*[As a logged-in User, I can customise my profile with an avatar so that my profile is easy to identify within the site](https://github.com/chris-townsend/where-next/issues/15)*

*[As a logged-in User, I would like the ability to update my profile so that I can keep my information up to date](https://github.com/chris-townsend/where-next/issues/16)*

*[As a logged-in User, I would like the ability to follow/unfollow users so I can keep track of their content and revisit their profiles easily](https://github.com/chris-townsend/where-next/issues/17)*

*[As a logged-in User, I can save a post to a personal list so that I can easily return to it later](https://github.com/chris-townsend/where-next/issues/19)*

*[As a User, I can search for posts or profiles by keyword so that I can find what I'm looking for more efficiently](https://github.com/chris-townsend/where-next/issues/21)*

*[As a User, I can keep scrolling through my feed of posts which load automatically, so that I don't have to change pages](https://github.com/chris-townsend/where-next/issues/26)*

*[As a User, I can contact the site owner so that I can request any information that I might need](https://github.com/chris-townsend/where-next/issues/28)*

*[As a Site owner, I can add a favicon so that the site looks more distinguishable](https://github.com/chris-townsend/where-next/issues/30)*

#

### EPIC | *Groups*
<br>

#

[Back to top ⇧](#contents)

***

## Validator Testing

![HTML w3c validator](docs/testing/html/html-w3c-validation.webp)

The *[W3C HTML validator](https://validator.w3.org/)* was used to test all HTML pages, and **no errors** were reported in the final deployment.

### HTML

| Page                   | Status      |              | URL         |
| ---                    |   :---:     |    :---:     |    :---:    |
|                        | *logged-in* | *logged-out* |             |
|`index.html`            |   *pass*    |   *pass*     |  *[result](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fkitchen-tales.herokuapp.com%2Fadd_recipe%2F#l189c24)*        |  


***

### CSS 

The *[W3C CSS Validator](https://jigsaw.w3.org/css-validator/)* was used to validate the project, the results are shown below with **no errors reported.**

![CSS w3c validator](docs/testing/css/css-w3c-validation.webp)
![CSS Result](docs/testing/css/css-validation-pass.webp)

- *[ CSS results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fkitchen-tales.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)*

***

### JavaScript

*[JSHint](https://jshint.com/)* was used to check the JavaScript within the application

![JSHint Logo](docs/testing/javascript/testing-jshint.webp)
![JavaScript Code to test](docs/testing/javascript/testing-jshint-code.webp)
![JShint test result](docs/testing/javascript/testing-jshint-result.webp)


***

### Lighthouse 

I have run the website through Google Chrome's Lighthouse audit application and the results are shown below:
 
| Page                     |    Desktop     |    Mobile    | 
| ---                      |      :---:     |    :---:     | 
| `403.html`               |![lighthouse result desktop 403](docs/testing/lighthouse/lighthouse-desktop-403.webp)                      |![lighthouse result mobile 403](docs/testing/lighthouse/lighthouse-mobile-403.webp)                      |   
| `404.html`               |![lighthouse result desktop 404](docs/testing/lighthouse/lighthouse-desktop-404.webp)                      |![lighthouse result mobile 404](docs/testing/lighthouse/lighthouse-mobile-404.webp)                      |
| `500.html`               |![lighthouse result desktop 500](docs/testing/lighthouse/lighthouse-desktop-500.webp)                      |![lighthouse result mobile 500](docs/testing/lighthouse/lighthouse-mobile-500.webp)              | 
| `add_recipe.html`        |![lighthouse result desktop add recipe](docs/testing/lighthouse/lighthouse-desktop-add-recipe.webp)         |![lighthouse result mobile add recipe](docs/testing/lighthouse/lighthouse-mobile-add-recipe.webp)          |


<br>

***

### WAVE accessibility evaluation tool

Most pages of the site were tested through the [WAVE evaluation tool](https://wave.webaim.org/), The results are documented as images in the [`docs/testing/accessibility/`]() directory.

 <br>

[Back to top ⇧](#contents)

***

## Browser Testing

The Website was tested on Google Chrome, Internet Explorer and Microsoft Edge with no issues reported. Family members and friends were asked to review the site and point out any bugs or problems if encountered.

***

## Device Testing

The website has been viewed on a variety of devices such as Desktop, Laptop, iPad, Oneplus 5t & Samsung Galaxy S21 to ensure that the responsive design worked as intended. [Chrome DevTools](https://developer.chrome.com/docs/devtools/) was used to test the responsiveness on different devices.

### Mobile 

All pages have been tested through Google's [Mobile friendly test](https://search.google.com/test/mobile-friendly), the results are displayed below:


| Page                     |    Result      |  URL    |
| ---                      |      :---:     |   :---: |
| ` `               |    *pass*      |    -    |
| ` `               |    *pass*      |    -    |


***

## Manual Testing

The process and outcomes of manual testing are described in depth in the following section:

### *Navigation*
<br>

| Page/Status     | Element             |   Action    | Expected Result           | Pass/Fail   |
| ---             | ---                 |   :---:     |    :---:                  |    :---:    |
|**Homepage**     |**Navbar**           |             |                           |             |
|                 |*         *          |   *click*   |                           |  **pass**   |
|                 |*Recipes link*       |   *click*   |                           |  **pass**   |
|                 |*Kitchen Tales logo* |   *click*   | *Redirect to homepage*    |  **pass**   |
|                 |*Search Recipes button*|   *click* | *Open `search_results` page*| **pass**  |
|                 |                     |   *hover*   | *Display lighter colour* |**pass**|
| **logged out**  |*MyAccount drop-down*|   *click*   | *Open drop-down menu*     |  **pass**   |  
|                 |*Sign-in link*       |   *click*   | *Open `login` page*       |  **pass**   |
|                 |*Register link*      |   *click*   | *Open `signup` page*      |  **pass**   |
| **logged in**   |*MyAccount drop-down*|  *display*  | *Change to username & user icon*|**pass**|
|                 |*Add-Recipe link*    |   *click*   | *Open `add_recipe` page*  |  **pass**   |
|                 |*My-Recipes link*    |   *click*   | *Open `my_recipes` page*  |  **pass**   |
|                 |*Saved-Recipes link* |   *click*   | *Open `my_starred_recipes` page*|**pass**|
|                 |*Logout link*        |   *click*   | *Open `logout` page*      |  **pass**   |
|                 |*All nav headings*   |   *hover*  |*Display darker text & underlined*| **pass** |
|                 |                     |             |                                 |            |
|**Mobile view**  |                     |             |                                 |           |
|                 |**Navbar**           |             |                              |               |


***

## Automated Testing

Several unit tests were written to test 

<details>

 **<summary>Coverage report</summary>**

![Automated testing coverage report](docs/testing/automated/coverage-report.webp)

</details>

<br>

*Coverage report generated from* [*Coverage.py*](https://coverage.readthedocs.io/en/7.1.0/)

***

## Bugs

Issues were created on GitHub and noted with a `bug` label.
<br>

### Fixed Bugs

1. [Unable to type in the username field during sign-up](https://github.com/chris-townsend/where-next/issues/31)

*resolved - [01e48b6](https://github.com/chris-townsend/where-next/commit/01e48b69c7bc08e243ead0f29a928919ec769f6d) missing name field within `<Form.Control`*

`name="username"`

2. [Unable to see information about a post in the console](https://github.com/chris-townsend/where-next/issues/32)

*resolved - [70f350a](https://github.com/chris-townsend/where-next/commit/70f350a17fa195b11ada98f0996a13ab062072ca)*

3. [Posts not listed until a key is typed into the search bar](https://github.com/chris-townsend/where-next/issues/33)

*resolved - [8376d42](https://github.com/chris-townsend/where-next/commit/8376d42f0ec4ecd4156538ffca087cf183b0d130)*

4. [Comment only removed after page refresh](https://github.com/chris-townsend/where-next/issues/34)

*resolved - [eeabc7b](https://github.com/chris-townsend/where-next/commit/eeabc7b837f0de8d6d21682491ac0c6595e3cf09)*

5. [Unable to follow a user from the 'Most followed' section](https://github.com/chris-townsend/where-next/issues/35)

*resolved - [5abde3d](https://github.com/chris-townsend/where-next/issues/35)*

6. [When a user updates their avatar image, all user avatar images are changed](https://github.com/chris-townsend/where-next/issues/36)

*resolved - [73770b9](https://github.com/chris-townsend/where-next/commit/73770b9eb4723f70e7882edb152d9bfbdbff0d0f)*

7. [Profile Image is not being displayed on ProfilePage.js](https://github.com/chris-townsend/where-next/issues/37)

*resolved - [8a3c508](https://github.com/chris-townsend/where-next/commit/8a3c508e99d323b1853c446d948bae0a1082bf8a)*

8. [Contact form returns a 403 error when the form is submitted](https://github.com/chris-townsend/where-next/issues/38)

*resolved - [8415f53](https://github.com/chris-townsend/where-next/commit/8415f533c46930873b9ca207685f5cf42b705f25)*

9. [Unable to update profile information](https://github.com/chris-townsend/where-next/issues/39)

*resolved - [5d46312](https://github.com/chris-townsend/where-next/commit/5d4631206020a4886c413609b4c0722984fcbbbb)*

10. [Join/Leave a group only after page refresh](https://github.com/chris-townsend/where-next/issues/40)

*resolved - [b8a7672](https://github.com/chris-townsend/where-next/commit/b8a767256b56ed652e1a12256f91f20c49e40aad)*

#

### Unfixed Bugs

1. 
 
<br>

[Back to top ⇧](#contents)

[Back to *README.md*](/README.md#testing)

***