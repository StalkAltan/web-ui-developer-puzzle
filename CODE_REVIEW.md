# Code Review Findings

`libs/books/feature/src/lib/book-search`
  * (controller, line 35) `ngOnInit`, we are subscribing to the store selector but not cleaning up the subscription. This could cause a memory leak.  
    Recommended fix: either unsub during `ngOnDestroy` or switch to using a class-level observable and the `async` pipe for binding in the template.  
    FIXED
    
  * (controller, line 40) `formatDate` method is unnecessary.  
     Recommended fix: can be removed and replaced with the built-in `DatePipe`    
    FIXED
    
  * (spec) No public methods are tested  
    Recommended fix: Add unit tests for public methods
    
  * (template) Could extra book cards into a separate display component

`libs/books/feature/src/lib/total-count`

  * (controller, line 15) `ngOnInit` is empty  
    Recommended fix: remove `ngOnInit` from class
    FIXED
    
`libs/books/data-access/src/lib/+state/books.effects.spec.ts`
  
  * (line 35) non-cleaned-up subscribe on a ReplaySubject, test could either manually unsubscribe or `pipe(take(1))`
  FIXED

`libs/books/data-access/src/lib/+state/books.reducer.spec.ts`

  * Not all reducer cases are tested

`libs/books/data-access/src/lib/+state/reading-list.effects.spec.ts`

  * Not all effects are tested

# Lighthouse Findings

  * Buttons do not have an accessible name
    * Affects the magnifying glass button in the search bar
  
  * Background and foreground colors do not have a sufficient contrast ratio
    * Affects reading list button in app header
    * Affects helper text in the book-search component

# Manual Findings

  * `libs/books/feature/src/lib/reading-list`

    * (template, line 4) `img` tag is missing an `alt` attribute

  * Book cards only screen read the 'want to read' button

  * The "Javascript" search example `<a>` tag should be a button
