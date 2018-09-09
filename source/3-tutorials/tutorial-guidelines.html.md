---
title: Tutorials Writing Guidelines
---

# Tutorial Writing Guidelines

## Structure

## Assumptions, Prerequisites & Knowledge level

## Code snippets

### Code Complexity

Beginners are the biggest consumers of tutorials, so it's important to keep code accessible. If the programming language you're using offers several ways of doing the same thing, use the most common one.

As a rule of thumb, better write clear and accessible code than trying to be smart.

### Balancing brevity & clarity

Code snippets can make tutorials grow longer. Try to find the right balance between brevity and clarity.

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

In this case, creating a new variable then passing it to the method is unnecessary because the code is simple and short enough, and the name of the method already implies what the nature of the argument is.

In other cases, breaking down code can improve readability. Let's take another example:

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

Here, there's a lot more happening. If we didn't use a variable, it could be tough for a beginner to understand what the code represents. That's a case where _not_ going for brevity is recommended, because otherwise it would hurt clarity.

The same rule applies when it comes to naming things:

```js
const objectToSend // bad (too verbose)
const o            // bad (unclear)
const obj          // good
const object       // better
```

Some abbreviated forms can be tolerated if they're conventional in the programming language you're writing for. Yet, always make sure it's accessible to people with less experience.

**Don't make these a hard rule**, and consider making decisions on a case-by-case basis. Remember that you're not writing production code and that clarity comes first, but at the same try to enforce good coding practices.

### Consistency & Formatting

Consistent code formatting helps readability. Keep formatting consistent across all code snippets, whether it's for indentation or punctuation. If possible, use a formatter/linter on your code before adding it to the tutorial.

Not only does it make reading easier to have a consistent coding style throughout a single tutorial, but also across all tutorials in a single documentation website. Before you start writing, go read other tutorials written in the same programming language to see what are the adopted conventions.

Consistent formatting, naming and coding style across all tutorials help users have a seamless experience when going from one tutorial to the next. **Try to make code snippets look like a single person wrote them**.

### Working code

Many people copy/paste code from tutorials right in their projects. If the code doesn't work because of a typo, a missing dependency or an unhandled error, this will cause frustration, bad developer experience, and more support tickets.

**Always test each code snippet and make sure they work**.

If a dependency is necessary, document it in the prerequisites section and show people how to set it up.

If something needs to be installed in the user's environment, mention it and add useful links.

If preliminary knowledge is necessary, make it obvious before going further with the tutorial and add links to useful resources (as much as possible, use official and/or authoritative resources).

## Mixed media

## Words to avoid
