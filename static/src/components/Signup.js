import React, { useState } from 'react';
import "./Login.css";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
    });    

    const confirmEmail = async () => {
        
        if (email === '' || username === '' || password === '' || confirmPassword === '') {
            alert('All fields are required');
            return false;
        }
        console.log(username, email, password, confirmPassword);
        try {
            const response = await fetch('http://127.0.0.1:8000/users/confirmationEmail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': token,
                },
                //credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
            })
            if (response.ok) {
                console.log('ok');
                window.location.href ='/confirmEmail'
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Failed to sign up. Please try again. 2');
        }
    }
    return (
        <div className='main-Container'>
            <div className="form-container">
                <p className="title">Sign Up</p>
                <div className="form">
                    <div className="input-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder=""
                            onChange={(e) => { setUsername(e.target.value) }}></input>
                    </div>

                    <div className="input-group">
                        <label for="username">Email</label>
                        <input type="text" name="username" id="username" placeholder=""
                            onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder=""
                            onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>

                    <div className="input-group">
                        <label for="username">Re-enter Password</label>
                        <input type="password" name="username" id="username" placeholder=""
                            onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                    </div>
                    <button class="sign" onClick={confirmEmail}>Sign Up</button>
                </div>

                <p class="signup">Have an account?
                    <a rel="noopener noreferrer" href="/login" class="">Login</a>
                </p>
            </div>


        </div>
    );

}

export default Signup;
