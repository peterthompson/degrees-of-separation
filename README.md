# Degrees of Separation

The purpose of this challenge is to see how you approach a problem and design a performant solution.
Degrees of separation - find relationships in between movies

Make a request to get data from [https://s3.eu-west-2.amazonaws.com/cognitionx-assets/movies.json](https://s3.eu-west-2.amazonaws.com/cognitionx-assets/movies.json) which returns following data structure.

```json
[
  {
    "title": "Holmes and Watson",
    "cast": [
      "Will Ferrell",
      "John C. Reilly",
      "Rebecca Hall",
      "Ralph Fiennes",
      "Rob Brydon",
      "Kelly Macdonald",
      "Lauren Lapkus",
      "Hugh Laurie"
    ]
  },
  {
    "title": "A Night at the Roxbury",
    "cast": ["Will Ferrell", "Chris Kattan", "Dan Hedaya", "Loni Anderson"]
  },
  {
    "title": "Corky Romano",
    "cast": ["Chris Kattan", "Peter Falk", "Fred Ward"]
  }
]
```

The challenge is to present how these movie titles are related to one another by the cast. For example, the movie "Holmes and Watson" and "A Night at the Roxbury" share the same cast member "Will Ferrell". Likewise "A Night at the Roxbury" and "Corky Romano" shares the same cast member "Chris Kattan".

Given the 2 movies "Holmes and Watson" and "Corky Romano", we can make connection by having "A Night at the Roxbury" in between by following the rule described above.

```
 "Holmes and Watson" -> "A Night at the Roxbury" -> "Corky Romano"
```

Use React & Redux to create an app that will:

1. Fetch the data from the url
2. Allow the user to select any 2 movies
3. Compute the shortest path between the two movies
4. Display all the movies within the path

Please present the results so that they work on any screen size. Use this as an opportunity to demonstrate your styling expertise.
