# Algolia Docs - Tutorials Guidelines

## Writing style

### Exhaustiveness vs. Conciseness

Technical tutorials often become too long. That's why you need to strike a balance between exhaustiveness and conciseness.

As a rule of thumb, try to be as exhaustive as possible with information, and as concise as possible regarding writing style.

**Don't forget your tutorial's end goal**. If you aim at teaching how to integrate Algolia with Firebase, then that's what you need to focus on. Add precision on the importance of this or that Firebase property, but don't explain why you're using `Array.map` instead of `Array.forEach`.

### Tense

Technical writing almost never needs to use the future tense. Unless you don't have a choice, favor present tense in your writing:

- _"We create a function that recursively pushes objects to Algolia"_ instead of _"we'll create a function that will recursively push objects to Algolia."_
- _"Once we're done, we get a collection that we can use for atomic reindexing"_ instead of _"once we're done, we'll have a collection that we'll be able to use for atomic reindexing."_

When future tense is inevitable, then it's okay to use it. That's the case of some conditional forms that introduce a consequence (if/then):

- _"if you delete an API key, this will break all production implementations that use it"_

### Editing

One of the secrets of good writing is **editing**. Once you're done with your tutorial, let it rest and come back later for editing. Look out for typos and overly complex or lengthy sentences. Replace repetitions with synonyms, and pedantic words with simpler alternatives. Cut the use of adverbs and passive form. Etc.

[Hemingway App](http://www.hemingwayapp.com/) and [Grammarly](https://app.grammarly.com/) can help you with editing. Yet, make sure you only use them with content that's intended to be public. Also, **don't add the Grammarly browser add-on** (ruled out by the security team).

### Focus and dependencies

Writing a tutorial can be like opening a can of worms. You start writing on a single topic, then realize it relies on preliminary knowledge of another topic. As you start adding precision, you quickly digress from your initial point.

If your tutorial has dependencies, state it at the beginning of the article, but don't write your own tutorial about it. Give enough resources for the user to educate themselves, then assume they have the necessary knowledge. Use official and/or authoritative resources as much as possible (e.g.: API docs instead of an unofficial Medium post).

### Words to avoid

Some words only add noise, and/or can alienate users depending on their level of experience. Here's a non-exhaustive list of words to cut from your writing:

- **Very**: adds noise and rarely brings value. Use a forceful word instead (eg.: brilliant instead of very smart, huge instead of very big, etc.)
- **Easy**, **simple**: calling something easy or simple will make readers feel bad if they don't find it easy or simple. Most sentence using these words can be entirely removed. If you want to promote your tutorial in the introduction, be more specific (e.g.: _"this tutorial shows you the quickest way to integrate Algolia and Travis CI"_ instead of _"this tutorial makes it easy to integrate Algolia and Travis CI"_). If you want to incentivize the use of a library or abstraction (e.g.: using Moment.js instead of the native JavaScript Date constructor), use a verb instead of an adjective (e.g.: _"we're using Moment.js to simplify date manipulation"_ instead of _"Moment.js makes it easy to handle dates"_).
- **Just**: same as with simple and easy, _just_ is a filler word which implies that the following sentence is a no-brainer. This may alienate beginners (e.g.: _"just run this command in your terminal"_, _"just write a traverse object utility function for this"_). Most of the time, you can remove _just_ without altering the sentence. When you can't, replace it with _only_ (e.g.: _"our object only has two properties"_ instead of _"our object just has two properties"_).

## Code snippets

### Complexity

Beginners are the biggest consumers of tutorials, so it's important to keep code accessible. If the programming language you're using offers several ways of doing the same thing, use the most common one.

For example, at the time of writing, handling JavaScript promises with `then` and `catch` methods is more accessible than `async`/`await` for a majority of JavaScript developers.

As a rule of thumb, better write clear and accessible code than trying to be smart.

### Brevity vs. clarity

Technical tutorials can become long, especially because of code snippets. Try to find the right balance between brevity and clarity.

For example, this:

```js
const record = {
  name: 'My first product',
  color: 'red'
}
index.addObjects(record)
```

Can be simplified into:

```js
index.addObjects({
  name: 'My first product',
  color: 'red'
})
```

**Don't make it a hard rule though**. In production code, you would usually avoid creating variables if you only used them once. Yet in tutorials, they can be useful for understanding what a piece of code is representing.

Let's now take another example:

```js
api.get().then(res => {
  const record = res.map(obj => {
	id: parseInt(obj.ID),
	name: obj.title,
	content: obj.content.replace(/<br>/g, "\n")
  })

  index.addObjects(record)
})
```

Here, there's a lot more happening. If we didn't use a variable, it could be tough for a beginner to understand what the code represents. That's a case where _not_ going for brevity is recommended, because it would hurt clarity.

Same goes for naming. Always try to strike a balance between brevity and clarity.

```js
const objectToSendToAlgolia = {
  /* ... */
} // too verbose
const o = {
  /* ... */
} // unclear
const object = {
  /* ... */
} // good
```

Some abbreviated forms are tolerated if they're conventional in the language you're using (e.g.: `obj` or `res` in JavaScript). Yet, always make sure it's accessible to people with less experience.

### Formatting

Consistent code formatting helps readability. Try to keep formatting consistent across all code snippets, whether it's for indentation or punctuation. If possible, use a formatter on your code (e.g.: Prettier for JavaScript).

### Consistency

Not only is it easier to have a consistent coding style throughout a single tutorial, but also across all tutorials in the Algolia Docs website. Before you write, try to read other tutorials written in the same language to see what are the adopted conventions.

Consistent formatting, naming and coding style across all tutorials help Algolia users have a seamless experience when going from one tutorial to the next. **Try to make code snippets look like a single person wrote them**.

### Working code

Many users copy/paste code from tutorials right in their projects. If code doesn't work because of a typo, a missing dependency or an unhandled error, this can cause frustration, bad developer experience, and more support tickets.

**Always test the code snippets you write and make sure they work well**. If a dependency is necessary, document it in the prerequisites and don't forget to inject it at the beginning of your snippet. If something needs to be installed in the user's environment, mention it and add links. If preliminary knowledge is necessary, make it obvious before going further with the tutorial and add links to useful resources (as much as possible, use official and/or authoritative resources).