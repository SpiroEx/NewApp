# For Devs

1. Create GitHub project and push
2. Check if will use Firebase

   - Create Firebase project

   - Update firebase.ts

   - `firebase use {{projec_id}}`

   - Update Constants::useFirebase = true

   - Check if will use Hosting

     - Update README.md: "The application is currently deployed at [{link}]({link})"

     - Check if will use SignIn

       - Update Constants::useSignIn = true

     - Check if will use FCM
       - Update Config::vapidKey
       - Update Constants::useFCM = true

- Check if will use TermsAndConditions

  - update Config::termsLink = true

3. Update {{Title}}, {{Title1}}, {{Title2}}, {{About}}, and {{Repo_Name}}.

4. `npm run import_figma`

5. Generate maskable images in [https://maskable.app/editor](https://maskable.app/editor). (or python only)

6. Generate favicon in [https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/). (or python only)

7. `npm run initialize`.

8. Change loading icon randomly

9. Remove this part when done

# {{Title}}

The application is currently deployed at [{link}]({link})

## Screenshot

![alt text](https://github.com/Manila-Arduino/{{Repo_Name}}/blob/main/public/images/screenshot.png)

## About

{{About}}
