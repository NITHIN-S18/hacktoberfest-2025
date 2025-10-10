const signin_link = document.getElementById("signin_link");
const signup_link = document.getElementById("signup_link");
const signin = document.getElementById("sign_in_id");
const signup = document.getElementById("sign_up_id");

// Navigator Function
function change_sign(event) {
    const targeted_id = event.currentTarget.id;
    if (targeted_id == "signin_link") {
        signin.style.display = "flex";
        signup.style.display = "none";
    } else {
        signin.style.display = "none";
        signup.style.display = "flex";
    }
}

// Show/Hide Password
function show_pass(event) {
    const show_icon = document.getElementById(event.currentTarget.id);
    const show_icon_parent = show_icon.parentElement;
    const parent_nextSibling = show_icon_parent.nextElementSibling;
    console.log(show_icon);
    console.log(show_icon.classList.contains("bx-show"));
    if (show_icon.classList.contains("bx-show")) {
        show_icon.classList.remove("bx-show");
        show_icon.classList.add("bx-hide");
        parent_nextSibling.type = "text";
    } else {
        show_icon.classList.add("bx-show");
        show_icon.classList.remove("bx-hide");
        parent_nextSibling.type = "password";
    }
}

// Validation Functions
function valid_email(email) {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // return email;
    return email_regex.test(email);
}

function valid_password(password) {
    const password_regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    // return password;
    return password_regex.test(password);
}

function valid_phone(phone) {
    const phone_regex =
        /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    // return phone;
    return phone_regex.test(phone);
}

function on_signup(event) {
    event.preventDefault();

    // Input Values
    const username_value = document.getElementById("user_name").value.trim();
    const useremail_value = document.getElementById("user_email").value.trim();
    const userpassword_value = document.getElementById("user_password").value;
    const userphone_value = document.getElementById("user_phone").value.trim();

    console.log(username_value);
    console.log(useremail_value);
    console.log(userpassword_value);
    console.log(userphone_value);

    // Inputs to focus
    const useremail = document.getElementById("user_email");
    const userpassword = document.getElementById("user_password");
    const userphone = document.getElementById("user_phone");

    // Get Users (if exist)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(users);
    if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
            console.log(users[i].userEmail);
            if (useremail_value === users[i].userEmail) {
                Swal.fire({
                    title: "Email already registered",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
                    },
                });
                return;
            }
        }
    }

    //Validations
    const email_status = valid_email(useremail_value);
    if (!email_status) {
        useremail.focus();
        useremail.classList.add("invalid");
        Swal.fire({
            title: `Invalid Email!`,
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        setTimeout(() => {
            useremail.classList.remove("invalid");
        }, 3000);
        return;
    }

    const password_status = valid_password(userpassword_value);

    if (!password_status) {
        Swal.fire({
            title: "Password doesn't meet requirements!",
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        userpassword.focus();
        userpassword.type = "text";

        setTimeout(() => {
            userpassword.type = "password";
        }, 5000);
        return;
    }

    const phone_status = valid_phone(userphone_value);
    if (!phone_status) {
        userphone.focus();
        userphone.classList.add("invalid");
        Swal.fire({
            title: `Invalid Phone Number!`,
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        setTimeout(() => {
            userphone.classList.remove("invalid");
        }, 3000);
        return;
    }

    users.push({
        userName: username_value,
        userEmail: useremail_value,
        userPassword: userpassword_value,
        userPhone: userphone_value,
    });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("user_name").value = "";
    document.getElementById("user_email").value = "";
    document.getElementById("user_password").value = "";
    document.getElementById("user_phone").value = "";
    // Show success and switch to login
    Swal.fire({
        title: "Registration successful! Please sign in.",
        showClass: {
            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
        },
    });
    change_sign({ currentTarget: { id: "signin_link" } });
}

function on_signin(event) {
    event.preventDefault();

    const check_email_value = document.getElementById("check_email").value.trim();
    const check_password_value = document.getElementById("check_password").value;

    // Inputs to focus
    const check_email = document.getElementById("check_email");
    const check_password = document.getElementById("check_password");

    //Validations
    const email_status = valid_email(check_email_value);
    if (!email_status) {
        check_email.focus();
        check_email.classList.add("invalid");
        Swal.fire({
            title: `Invalid Email!`,
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        setTimeout(() => {
            check_email.classList.remove("invalid");
        }, 3000);
        return;
    }

    const password_status = valid_password(check_password_value);
    if (!password_status) {
        Swal.fire({
            title: "Password doesn't meet requirements!",
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        check_password.focus();
        check_password.type = "text";

        setTimeout(() => {
            check_password.type = "password";
        }, 5000);
        return;
    }

    // Get Users (if exist)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(users);
    if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
            // checks the password after getting the email
            if (check_email_value === users[i].userEmail) {
                if (check_password_value !== users[i].userPassword) {
                    Swal.fire({
                        title: "Incorrect Password",
                        showClass: {
                            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
                        },
                        hideClass: {
                            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
                        },
                    });
                    check_password.focus();
                    check_password.type = "text";
                    return;
                } else {
                    Swal.fire({
                        title: "Login successful!",
                        showClass: {
                            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
                        },
                        hideClass: {
                            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
                        },
                    });
                    change_sign({ currentTarget: { id: "signup_link" } });
                    return;
                }
            }

            // alert when email don't match with any existing email
            if (check_email_value !== users[users.length - 1].userEmail) {
                Swal.fire({
                    title: "No account found with this email!",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
                    },
                });
                check_email.focus();
                check_email.classList.add("invalid");
                setTimeout(() => {
                    check_email.classList.remove("invalid");
                }, 3000);
                return;
            }
        }
    } else {
        Swal.fire({
            title: "There is not any email registered.",
            showClass: {
                popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
            },
        });
        change_sign({ currentTarget: { id: "signup_link" } });
    }
}

// Initialize Bootstrap Popovers
document.addEventListener("DOMContentLoaded", function () {
    // Select all popover elements
    var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );

    // Initialize each one
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            trigger: "hover focus", // Optional: makes it show on hover
        });
    });
});
