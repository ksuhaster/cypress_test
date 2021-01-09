First - [install Cypress dependencies.](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

### Run
Yarn is used as a package manager in this exapmle.

 - To test in **headless mode** with console output, run:
```
yarn cypress run --browser chrome --headless
```

 - To test in **interactive mode**, where you can see status logs during the test, run:
```
yarn cypress open
```
and choose the test to run.

### Credentials
1. You need to pass your profile credentials in **cypress/support/commands.js**
Find command named ```noUiLogin``` and pass email and password in responses body like this:
```
body: {
        email: 'your@email.com',
        password: 'yourpassword',
        csrfmiddlewaretoken: inputCsrf
       }
```

2. You need to pass credentials in **cypress/integration/login_page/login_page.js**
Find test named as ```checks logging in and validate redirect to /inbox/``` and pass email and password as an argument of `type()` like this:
```
cy.get('#email').type('your@email.com');
cy.get('#password').type('yourpassword{enter}');
```

### Use and modify comments
By default company jobs page url are hardcoded. You can change the company in **cypress.json** by changing ```companyJobs``` object values:

```CompanyJobsPage``` for company jobs page url

```CompanyName``` for the same company name.
