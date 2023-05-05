React component didyoufind 
Allows the user to answer yes/no to "Is this information what you were looking for?" question.
If user selects "No" then they are provided with a link to a modal 
that lets them give text feedback.
The answers and feedback are submitted to a route that send them onto
MixPanel

# Styling
`DidYouFind` relies on several Leyden style components. These must be included in the applications main `scss` file

```sass
@import '~@els/els-styleguide-core/scss/core'
@import '~@els/els-styleguide-button/scss/button'
@import '~@els/els-styleguide-link/scss/link'
@import '~@els/els-styleguide-form-field/scss/form-field'
```

# Dark mode
To render the didyoufind component in dark mode add ```darkMode``` prop to the DidYouFind component.