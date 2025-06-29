function checkSignIn(notSignedInUrl, signedInUrl) {
    const isSignedIn = localStorage.getItem('signedIn');
    if (!isSignedIn) {
        alert('Not signed in');
        window.location.href = notSignedInUrl;
    } else {
        window.location.href = signedInUrl;
    }
}

function checkSignInStatus() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('signin') || params.has('signup')) {
        localStorage.setItem('signedIn', true);
    }
}

function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    // Log form data for troubleshooting
    console.log('SignUp Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    fetch('/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'account-signin.html'; // Redirect after successful signup
        } else {
            console.error('Signup error:', response.statusText);
        }
    })
    .catch(error => {
        console.error('There was a problem with the signup request:', error);
    });
}

document.getElementById('signup-form')?.addEventListener('submit', handleSignUp);

function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    // Log form data for troubleshooting
    console.log('SignIn Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    fetch('/signin', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem('signedIn', true);
            window.location.href = 'index.html'; // Redirect after successful sign in
        } else {
            console.error('Sign-in error:', response.statusText);
        }
    })
    .catch(error => {
        console.error('There was a problem with the sign-in request:', error);
    });
}

document.getElementById('signin-form')?.addEventListener('submit', handleSignIn);

// Implement the logout function
function logout() {
    localStorage.removeItem('signedIn'); // Remove sign-in status
    alert('You have been logged out.');
    window.location.href = 'account-signin.html'; // Redirect to sign-in page
}
