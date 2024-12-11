const libraryTag = document.querySelector(".container")
const form = document.querySelector("form");
const container = document.querySelector(".container");
let books = [];
class Book {
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = read;
    this.id = String(books.length + 1);
  };
  switchRead(){
    this.hasRead = !this.hasRead
  }
}

[
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
  new Book("1984", "George Orwell", 328, false),
  new Book("Pride and Prejudice", "Jane Austen", 272, true),
  new Book("The Catcher in the Rye", "J.D. Salinger", 234, false),
  new Book("The Hobbit", "J.R.R. Tolkien", 310, false),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1216, false),
  new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 320, false)
].forEach(book => books.push(book))



// first rendering 
document.addEventListener("DOMContentLoaded", ()=>{
  renderBooks(books);
})

libraryTag.addEventListener("click", (e)=>{
  if(e.target.classList.contains("delete")){
    const id = e.target.dataset.id;
    console.log(id);
    books = books.filter(book => book.id !== id);
    renderBooks(books);
  }else if(e.target.classList.contains("read-btn")){
    const itemId = e.target.dataset.id
    const readBtns = document.querySelectorAll(".read-btn")
    console.log('btns', readBtns);
    
    console.log('target id', e.target.dataset.id);
    const targetedBook = books.find(book=> book.id === itemId)
    console.log(targetedBook);
    targetedBook.switchRead()
    books[itemId] = targetedBook
  }

  
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
    document.querySelector(".alert").textContent = "Book already exists";
    setTimeout(()=>{
      document.querySelector(".alert").textContent = "";
    }, 3000)
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
    console.log(book, book.hasRead);
    const bookCard = document.createElement("div");
    const text = `
    <span class="book-title">${book.title}</span> <br> 
    Author name: <span class="author-name">${book.author}</span> <br> 
    Number of pages: <span class="pages">${book.pages}</span><br>
    <button data-id=${book.id} class="delete"> delete</button> 
    <button class="read-btn" data-id=${book.id} > ${book.hasRead? "mark unread":"mark read"}</button>`
    bookCard.innerHTML = text;
    libraryTag.appendChild(bookCard)
  })


}



const toggleAdd = document.querySelector(".toggle-add")
toggleAdd.addEventListener("click", ()=>{
  form.style.display = form.style.display === "none" ? "block" : "none"

});



//search handler
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e)=>{
  const searchValue = e.target.value;
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchValue.toLowerCase()));
  renderBooks(filteredBooks);
})

