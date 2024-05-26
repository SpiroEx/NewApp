# For Devs

1. `automate init`
2. `automate start`

--

2. Create GitHub project and push

3. Check if will use Firebase

   - Create Firebase project

   - Update firebase.ts

   - `firebase use {{projec_id}}`

   - Update Constants::useFirebase = true

   - Check if will use Hosting

     - Update README.md: "The application is currently deployed at [{link}]({link})"

     - Check if will use SignIn

       - Update Constants::useSignIn = true

     - Check if will use Register

       - Update Constants::useRegister = true

     - Check if will use FCM
       - Update Config::vapidKey
       - Update Constants::useFCM = true

   - Check if will use Storage / Functions
     - Update firebase.json

- Check if will use TermsAndConditions

  - update Config::termsLink = true

4. Update {{Title}}, {{Title1}}, {{Title2}}, {{About}}, {{Repo_Name}}, {{manifest_bg}}.

5. Remove this part when done

# {{Title}}

The application is currently deployed at [{link}]({link})

## Screenshot

![alt text](https://github.com/Manila-Arduino/{{Repo_Name}}/blob/main/public/images/screenshot.png)

## About

{{About}}
