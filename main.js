const libraryTag = document.querySelector(".container")
const form = document.querySelector("form");
const container = document.querySelector(".container");
const formCloseTag = document.querySelector(".close-form")
const alertTag = document.querySelector(".alert")
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

books.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false))
books.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, true))
books.push(new Book("1984", "George Orwell", 328, false))
books.push(new Book("Pride and Prejudice", "Jane Austen", 272, true))
books.push( new Book("The Catcher in the Rye", "J.D. Salinger", 234, false))
books.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, false))
books.push(new Book("The Lord of the Rings", "J.R.R. Tolkien", 1216, false))
books.push(new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 320, false))



// first rendering 
document.addEventListener("DOMContentLoaded", ()=>{
  renderBooks(books);
})


libraryTag.addEventListener("click", (e)=>{
  if(e.target.classList.contains("delete")){
    const id = e.target.dataset.id;
    let bookToDelete;
    [bookToDelete] = books.filter(book => book.id === id)
    console.log('book to delete ', bookToDelete.title);
    
    if(window.confirm(`Do you want to delete "${bookToDelete.title}" by ${bookToDelete.author}?`)){

      console.log({id});
      books = books.filter(book => book.id !== id);
      renderBooks(books);
    }
  }else if(e.target.classList.contains("read-btn")){

    const itemId = e.target.dataset.id
    const targetedBook = books.find(book=> book.id === itemId)
    targetedBook.switchRead()
    books.forEach(book =>{
      if (book.id === itemId){
        book = targetedBook
      }
    })
    renderBooks(books)
  }
})



const handleSubmitEvent =  (e)=>{
  e.preventDefault();
  
  // form values
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;
  if (bookTitle.length < 4){
    alertTag.textContent = 'book name must be at least 4 letters'
    setTimeout(()=>{
      alertTag.textContent = ""
    }, 5000)
  }else if(bookAuthor.length < 4){
    alertTag.textContent = 'Author name must be at least 4 letters'
    setTimeout(()=>{
      alertTag.textContent = ""
    }, 5000)
  }else if(Number(bookPages)<20){
    alertTag.textContent = 'anything less than 20 pages is not considered as a book (on this website)'
    setTimeout(()=>{
      alertTag.textContent = ""
    }, 5000)
  }else{

    //check for existence of book title and author in books array
    const bookExists = books.find(book => book.title === bookTitle && book.author === bookAuthor);
    if(bookExists){
      document.querySelector(".alert").textContent = "Book already exists";
      setTimeout(()=>{
        document.querySelector(".alert").textContent = "";
        document.querySelector("form").reset();
      }, 5000)
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
    document.querySelector("#show-form").close()
  }

}
// form submit
form.addEventListener("submit", handleSubmitEvent)

formCloseTag.addEventListener("click", ()=>{
  document.querySelector("form").reset();
  document.querySelector("#show-form").close()
})




function renderBooks(books){
  libraryTag.innerHTML = "";  
  books.forEach(book => {
    console.log(book, book.hasRead);
    const bookCard = document.createElement("div");
    bookCard.className = "book-card"
    const text = `
    <span class="book-title">${book.title}</span> <br> 
    by <span class="author-name">${book.author}</span> <br> 
     <span class="pages">🗐 ${book.pages}</span> pages<br>
    <div>${book.hasRead? "✅ Read already":"⭕ Did'nt read"}</div>
    <button data-id=${book.id} class="delete"> delete</button> 
    <button class="read-btn" data-id=${book.id} > ${book.hasRead? "mark unread":"mark read"}</button>`
    bookCard.innerHTML = text;
    libraryTag.appendChild(bookCard)
  })


}

const toggleAdd = document.querySelector(".toggle-add")
toggleAdd.addEventListener("click", ()=>{
  document.querySelector("#show-form").show()

});


//search handler
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e)=>{
  const searchValue = e.target.value;
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()));
  renderBooks(filteredBooks);
})

