const libraryTag = document.querySelector(".container")
const form = document.querySelector("form");



// array of books
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


class Book {
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = read;
    this.id = String(Math.floor(Math.random() * 1000));
  }
}
// first rendering 
document.addEventListener("DOMContentLoaded", ()=>{
  renderBooks(books);
  document.querySelectorAll(".delete").forEach(btn =>{
    btn.addEventListener("click", ()=>{
      console.log(btn.dataset.id);
      
    })
  })
})


const handleSubmitEvent =  (e)=>{
  e.preventDefault();
  
  // form values
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  //check for existence of book title and author in books array
  const bookExists = books.find(book => book.title === bookTitle && book.author === bookAuthor);
  if(bookExists){
    alert("Book already exists");
    return;
  }

  //create book and add to books
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  books.push(newBook);
  console.log(books);
  //render books
  renderBooks(books);
  //clear form
  document.querySelector("form").reset();

}
// form submit
form.addEventListener("submit", handleSubmitEvent)
console.log('books', books);




function renderBooks(books){
  libraryTag.innerHTML = "";  
  books.forEach(book => {
    const bookCard = document.createElement("div");
    const text = `
    <span class="book-title">${book.title}</span> <br> 
    Author name: <span class="author-name">${book.author}</span> <br> 
    Number of pages: <span class="pages">${book.pages}</span><br>
    <button data-id=${book.id} class="delete"> delete</button>`
    bookCard.innerHTML = text;
    libraryTag.appendChild(bookCard)
  })


}



const toggleAdd = document.querySelector(".toggle-add")
toggleAdd.addEventListener("click", ()=>{
  form.style.display = form.style.display === "none" ? "block" : "none"

})






        
// function displayBook(book){
//     // create div for  each book 
//     const bookCard = document.createElement("div")
//     // create innerHTML for each book 
//     const text = `
//         <span class="book-title">${book.title}</span> <br> Author name: <span class="author-name">${book.author}</span> <br> Number of pages: <span class="pages">${book.pages}</span><br>
//         ${book.read? "Has read already" : "Haven't read"} <br> <button onclick="handleRead()">${book.read? "Mark not read" : "Mark read"}</button><button class="delete-book" data-id=${book.id} onclick="removeBook()">Remove</button>
//     `
//     bookCard.innerHTML = text;
//     libraryTag.appendChild(bookCard)
// }


// function removeBook(){
//     console.log('removeBook clicked');
    
// }

// const deleteBtns = document.querySelectorAll(".delete-book")

// deleteBtns.forEach(btn => {
//     btn.addEventListener("click", ()=>{
//         console.log(btn.dataset.id);
        
//     })
// })








  // books.forEach(displayBook )
