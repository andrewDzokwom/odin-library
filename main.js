const libraryTag = document.querySelector(".container")





function displayBook(book){
    // create div for  each book 
    const bookCard = document.createElement("div")
    // create innerHTML for each book 
    const text = `
        <span class="book-title">${book.title}</span> <br> Author name: <span class="author-name">${book.author}</span> <br> Number of pages: <span class="pages">${book.pages}</span><br>
        ${book.read? "Has read already" : "Haven't read"} <br> <button onclick="handleRead()">${book.read? "Mark not read" : "Mark read"}</button><button onclick="removeBook()">Remove</button>
    `
    bookCard.innerHTML = text;
    libraryTag.appendChild(bookCard)
}











const books = [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      pages: 281,
      hasRead: true
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      pages: 328,
      hasRead: false
    },
    {
      id: "3",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      pages: 272,
      hasRead: true
    },
    {
      id: "4",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 180,
      hasRead: false
    },
    {
      id: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      pages: 272,
      hasRead: true
    }
  ];

  books.forEach(displayBook )
