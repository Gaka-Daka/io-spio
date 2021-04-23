import { getUser, createUser, userExists } from '../local-storage-utils.js';

const test = QUnit.test;

test('get user from local storage', (expect) => {
    
    const user = {
        username: 'username',
        password: 'password',
        games: []
    };

    localStorage.setItem('USER', JSON.stringify(user));
    const actual = getUser();
    
    expect.deepEqual(actual, user);
});

test('create a new user', (expect) => {
    //Arrange
    // Set up your arguments and 

    const expected = {
        username: 'username',
        password: 'password',
        games: []
    };

    createUser('username', 'password');

    const actual = JSON.parse(localStorage.getItem('USER'));

    //Act 
    // Call the function you're testing and set the result to a const
    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
});

test('check if user exists', (expect) => {

    const expected = false;
    const actual = userExists();
    


    expect.deepEqual(actual, expected);

});