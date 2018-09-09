---
title: tech writing guidelines draft
---

<section>
This doc is used by the documentation team as a guide for writing tech content. It is not yet finished - Please excuse its confused formatting and structure.

</section>

<section>

## General rules

- American spelling should be always be used unless British spelling (or words) is part of the API interface. For example, sometimes you might want to use British spelling if a parameter or method is using British spelling. Equally, British words like indices may also be used in the API interface and therefore be used in the docs. But it is not necessary to follow such spellings or words. Exceptions should be minimized and treated case-by-case.

- Don't use single quotes (``) if also using a hyperlink.

</section>

<section>

## Tone

When talking about in Algolia's name, prefer "we" instead of "Algolia". For example, prefer "we store your data" rather than "Algolia stores your data".

When talking about the technology, you can refer to "the engine" or "Algolia" if "the engine" is overused.

</section>

<section>

## Terminology

### Object / Record
We use these 2 words interchangeably. Sometimes witin the same sentence. So don't place any significance on their usage:

- Indexes contain objects or records
- JSON contains objects or records

### Attribute
All objects and records contain attributes ... or fields, or elements. Within the search and indexing contexts, we often speak of  settings and parameters. Again, these terms are mostly interchangeable.

Some attributes are simple key/value pairs, such as `queryType`.
```js
index.setSettings({
  queryType: 'prefixLast'
});
```

But others can be more complex, making it look more like a collection or an object. There are many examples of this:

```php
$index->setSettings([
  'attributesForFaceting' => [
    "author",
    "filterOnly(category)",
    "searchable(publisher)"
  ]
]);

$index->setSettings([
  'searchableAttributes' => [
    "title,alternative_title",
    "author",
    "unordered(text)"
  ]
]);


$results = $index->search('query', [
  'filters' => '(category:Book OR category:Ebook) AND _tags:published'
]);
```

### File / Array / Element

These terms all refer to JSON. A JSON *object*, for example, is an entire JSON file or array. A JSON file  is, well, a file that contains an object or an array of objects. A JSON array is no different from a file - both are blocks of JSON elements; however, array is often used to indicate an inline JSON block.

To see why we are even mentioning this, consider the following sentence: *A JSON object contains many new JSON objects that get added to an index, which now contains new index objects.* To improve that kind of sentence, we freely switch between the above terms for better readability: *A JSON file (or array) contains many new JSON elements that get added to an index, which now contains new index objects (or records).*

</section>

<section>

## vocabulary (Work in progress)

General comment: Writers need synonyms. For me, precise vocabulary can get in the way of explaining things. For example, “The sun shines” is far better than “The sun radiates energy” which is clearly better than “The central star of our solar system burns hydrogen and helium producing radiation which causes us to perceive color and heat …”  Although maybe the last sentence has its place somewhere deep in the documentation.

### Records vs Objects

Not the same, both meaningful, different contexts.
- Records are usually associated with tables in a database, or with individual lines in a CSV file. Maybe they can be defined as a complete entity, which includes one or more pieces (or fields) of information. More difficult is the XML or JSON context, where  the word “records” is not really used except in the context of transformation, where some part (or parts) of an XML or JSON are transformed into a record.
- Objects are also meaningful in a database, as tables, stored procedures, functions, indexes, triggers, etc.. Objects are not records. Or not only records. But every record is an object.
- Objects are things that encapsulate information, behavior, processes, etc. , whereas records encapsulate only information.

### Field vs Attribute

Probably a distinction without a difference. Personal preference. Consistency is important.

I’ll have to give this more thought, but outside of the classic database context (field), or XML (attribute), they seem interchangeable. Well, maybe. A field can have attributes, like string and size, but I don’t think an attribute can have a field of something. Both contain information that is attached to another object. Field is maybe broader in meaning, and can maybe stand on its own, whereas an attribute is almost always a qualifier to another thing. A field can be considered a noun or verb, and an attribute would be an adjective or adverb. Will need to keep thinking about this.

### Get vs Retrieve

Difficult one. Get is plain English for Retrieve. We don’t use the word retrieve in conversation (except for dogs who “retrieve” sticks), and we don’t see functions called retrieveResults(), we see getResults(). Easier to read. However, retrieve is more precise, and gives the impression of a “client-server get”,  where we go somewhere (to a server), perform some actions, and return a result, whereas Get just seems to mean Get a value, nothing more. Retrieve is also less ambiguous: Get has other means, like “do you get it” or “get out of bed”. For me, get should be used when you are explaining  things conceptually (we get data from a server). This simplifies understanding. But retrieve is a more technical term. Not really helpful.

### Set vs change vs save vs update

Ugh. Preference. For front end developers, I am guessing that Save or Update are both user friendly, and both are justifiable depending on context. On the server side, Save might be sufficient for all “save” operations, where Update should maybe be used only in opposiition to Insert (that said, most “save” operations apply Update / Insert logic).

Set should be the counterpart to Get, so maybe we are referring to variables and in-memory objects when we use Get and Set.

Where does Change fit in? I don’t know yet. But I am guessing it is a temporary, non persistent state. And it maybe also refers to an assignment or value of a variable or state.

### Add vs create

Add a record, create a table. Add something new to an existing something. Create something that doesn’t exist.

Match vs retrieve (speaking of words that return results)

Not too sure I “get” this one. They don’t seem to have anything in common.

### Hit vs result

Hit is Algolia jargon for “hits”. Jargon means that that the word has a special meaning / that Algolia uses it for a very specific reason, and so readers / Algolia customers need to understand exactly what we mean by Hits. Result is used everywhere. Shouldn’t be interchangeable.

### Query vs request

Seems interchangeable. Or Query is a kind of request. Not thought about yet.

### Task vs operation

...

### Indexes vs indices

The words indexes and indices are used interchangeably throughout our documentation. The first is simply the American spelling. The API sometimes uses the British spelling. Don’t place any significance on their usage.

Already discussed. https://algolia.slack.com/archives/C3742QTHT/p1500280758591926

I need to know the history of this.

### Response vs answer (no debate on this one IMHO, "answer" is simply incorrect)

I agree. But again, I think iwe can use them interchangeably in conceptual writing, where you need synonyms. Clearly, response is always better - plain English + jargon :) But when describing conceptually clients and servers, and you say a client calls a server, it is ok to say there is no “answer”, that’s just as clear and accurate as to say there is no “response”.

</section>