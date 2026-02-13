function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getBookings() {
    return JSON.parse(localStorage.getItem("bookings")) || [];
}

function saveBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = getUsers();
    users.push({username, password});
    saveUsers(users);

    alert("Kasutaja loodud!");
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = getUsers();
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        showCalendar();
    } else {
        alert("Vale kasutajanimi või parool");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("calendarSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

function showCalendar() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("calendarSection").style.display = "block";
    displayBookings();
}

function isDoubleBooking(date, start, end) {
    let bookings = getBookings();

    return bookings.find(b =>
        b.date === date &&
        !(b.end <= start || b.start >= end)
    );
}

function addBooking() {
    let date = document.getElementById("date").value;
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let title = document.getElementById("title").value;

    if (isDoubleBooking(date, start, end)) {
        alert("See aeg on juba broneeritud!");
        return;
    }

    let bookings = getBookings();
    bookings.push({date, start, end, title});
    saveBookings(bookings);

    displayBookings();
}

function displayBookings() {
    let list = document.getElementById("bookingList");
    list.innerHTML = "";

    let bookings = getBookings();

    bookings.forEach(b => {
        let li = document.createElement("li");
        li.textContent = `${b.date} ${b.start}-${b.end} | ${b.title}`;
        list.appendChild(li);
    });
}

window.onload = function() {
    if (localStorage.getItem("loggedInUser")) {
        showCalendar();
    }
};
